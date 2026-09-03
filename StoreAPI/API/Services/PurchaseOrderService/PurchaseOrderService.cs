using API.Data;
using API.Data.Models;
using API.Data.Filters;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class PurchaseOrderService : IPurchaseOrderService
    {
        private readonly StoreDB _database;

        public PurchaseOrderService(StoreDB database)
        {
            this._database = database;
        }
        public StoreDB Database { get; }
        public IQueryable<PurchaseOrder> ListPurchaseOrders(PurchaseOrderFilters? filter = null)
        {
            filter ??= new PurchaseOrderFilters();

            return this._database.PurchaseOrder
                .Include(p => p.PurchaseOrderProduct)
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
                .Where(p => p.Id == id)
                .FirstOrDefaultAsync();
        }
    }
}