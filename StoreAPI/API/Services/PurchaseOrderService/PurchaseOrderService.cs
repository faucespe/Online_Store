using API.Data;
using API.Data.Models;
using API.Data.Filters;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using API.DataTransferObjects;
using System.Net;

namespace API.Services
{
    public class PurchaseOrderService : IPurchaseOrderService
    {
        private readonly StoreDB _database;
        private readonly IProductService _productService;

        public PurchaseOrderService(StoreDB database, IProductService productService)
        {
            this._database = database;
            this._productService = productService;
        }
        public StoreDB Database { get; }
        public IQueryable<PurchaseOrder> ListPurchaseOrders(PurchaseOrderFilters? filter = null)
        {
            filter ??= new PurchaseOrderFilters();

            return this._database.PurchaseOrder
                .Include(p => p.PurchaseOrderProduct)
                .ThenInclude(p => p.Product)
                .Where(p => (!filter.Id.HasValue || p.Id == filter.Id.Value)
                    && (string.IsNullOrEmpty(filter.CustomerName) || p.CustomerName.Contains(filter.CustomerName))
                    && (string.IsNullOrEmpty(filter.CustomerPhoneNumber) || p.CustomerPhoneNumber.Contains(filter.CustomerPhoneNumber))
                    && (!filter.GrandTotalFrom.HasValue || p.GrandTotal >= filter.GrandTotalFrom.Value)
                    && (!filter.GrandTotalTo.HasValue || p.GrandTotal <= filter.GrandTotalTo.Value)
                    && (!filter.PurchaseDateFrom.HasValue || p.PurchaseDate >= filter.PurchaseDateFrom.Value)
                    && (!filter.PurchaseDateTo.HasValue || p.PurchaseDate <= filter.PurchaseDateTo.Value)
                );
        }

        public async Task<PurchaseOrder?> FindPurchaseOrder(int id)
        {
            return await this._database.PurchaseOrder
                .Include(p => p.PurchaseOrderProduct)
                .ThenInclude(p => p.Product)
                .Where(p => p.Id == id)
                .FirstOrDefaultAsync();
        }

        public async Task InsertPurchaseOrder(PurchaseOrder entity, List<CartProduct> cartProducts)
        {
            List<Product> productList = await this._productService.ListProducts()
                .OrderBy(p => p.Id)
                .ToListAsync();

            // Validations
            bool hasDuplicatedProducts = cartProducts.DistinctBy(cp => cp.ProductId).Count() != cartProducts.Count;
            if (hasDuplicatedProducts) throw new InvalidOperationException("Lo sentimos, algo salió mal.");

            entity.GrandTotal = 0;

            foreach (CartProduct cartProduct in cartProducts)
            {
                bool cartProductExist = false;
                bool hasEnoughStock = true;
                foreach (Product product in productList)
                {
                    // Check if the product exists
                    if (product.Id != cartProduct.ProductId)
                    {
                        continue;
                    }
                    
                    cartProductExist = true;

                    // Calculates GrandTotal
                    entity.GrandTotal += cartProduct.Quantity * product.Price;

                    // Check if the product has enough stock
                    if (product.Stock < cartProduct.Quantity || cartProduct.Quantity <= 0)
                    {
                        hasEnoughStock = false;
                        break;
                    }

                    break;
                }
                if (!cartProductExist || !hasEnoughStock)
                {
                    throw new InvalidOperationException("Lo sentimos, algo salió mal.");
                }
            }

            //SQL Transaction
            using IDbContextTransaction transaction = 
            await this._database.Database.BeginTransactionAsync();

            try
            {
                entity.PurchaseDate = DateTime.UtcNow;
                this._database.PurchaseOrder.Add(entity);
                await this._database.SaveChangesAsync();

                foreach (CartProduct cartProduct in cartProducts)
                {
                    Product product = productList.First(p => p.Id == cartProduct.ProductId);
                    product.Stock -= cartProduct.Quantity;

                    this._database.PurchaseOrderProduct.Add(new PurchaseOrderProduct
                    {
                        PurchaseOrderId = entity.Id,
                        ProductId       = product.Id,
                        ProductQuantity = cartProduct.Quantity,
                        Price           = product.Price
                    });
                }

                await this._database.SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch
            {
                await transaction.RollbackAsync();
                throw new InvalidOperationException("Lo sentimos, algo salió mal.");
            }
        }
    }
}