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

        public async Task InsertPurchaseOrder(PurchaseOrder entity)
        {
            var cartProductIds = entity.PurchaseOrderProduct.Select(pop => pop.ProductId);

            Dictionary<int, Product> productsDictionary = await this._database.Product
                .Where(p => cartProductIds.Contains(p.Id))
                .ToDictionaryAsync(p => p.Id);

            foreach (PurchaseOrderProduct cartProduct in entity.PurchaseOrderProduct.ToList())
            {
                // Calculate GrandTotal & Update product stock
                Product product = productsDictionary[cartProduct.ProductId];
                entity.GrandTotal += cartProduct.ProductQuantity * product.Price;
                product.Stock -= cartProduct.ProductQuantity;
                 
                // Fill PurhcaseOrderProduct Table
                cartProduct.Price = product.Price;
                entity.PurchaseOrderProduct.Add(cartProduct);
            }

            entity.PurchaseDate = DateTime.UtcNow;
            this._database.PurchaseOrder.Add(entity);
            await this._database.SaveChangesAsync();
        }
    }
}