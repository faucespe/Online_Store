using API.Data;
using API.Data.Filters;
using API.Data.Models;
using API.DataTransferObjects;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System.Net;

namespace API.Services
{
    public class PurchaseOrderService : IPurchaseOrderService
    {
        private readonly StoreDB _database;
        private readonly IProductService _productService;
        private readonly IMapper _mapper;

        public PurchaseOrderService(StoreDB database, IProductService productService, IMapper mapper)
        {
            this._database = database;
            this._productService = productService;
            this._mapper = mapper;
        }
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

        public async Task<PurchaseOrder> InsertPurchaseOrder(PurchaseOrderCustom entity)
        {
            List<Product> productList = await this._productService.ListProducts()
                .OrderBy(p => p.Id)
                .ToListAsync();

            //Calculates GrandTotal
            entity.GrandTotal = 0;
            foreach (CartProduct cartProduct in entity.CartProducts)
            {
                Product product = productList.Find(p => p.Id == cartProduct.ProductId);
                entity.GrandTotal += cartProduct.Quantity * product.Price;
            }

            entity.PurchaseDate = DateTime.UtcNow;

            //Mappings
            PurchaseOrder purchaseOrder = this._mapper.Map<PurchaseOrderCustom, PurchaseOrder>(entity);

            //SQL Transaction
            foreach (CartProduct cartProduct in entity.CartProducts)
            {
                Product product = productList.First(p => p.Id == cartProduct.ProductId);
                product.Stock -= cartProduct.Quantity;

                purchaseOrder.PurchaseOrderProduct.Add(new PurchaseOrderProduct
                {
                    ProductId = product.Id,
                    ProductQuantity = cartProduct.Quantity,
                    Price = product.Price
                });
            }

            this._database.PurchaseOrder.Add(purchaseOrder);
            await this._database.SaveChangesAsync();

            return purchaseOrder;
        }
    }
}