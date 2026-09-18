using API.Data;
using API.Data.Filters;
using API.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class PurchaseOrderProductService : IPurchaseOrderProductService
    {
        private readonly StoreDB _database;

        public PurchaseOrderProductService(StoreDB database)
        {
            this._database = database;
        }
        public StoreDB Database { get; }

        public IQueryable<PurchaseOrderProduct> ListPurchaseOrderProducts(PurchaseOrderProductFilters? filter = null)
        {
            filter ??= new PurchaseOrderProductFilters();

            return this._database
                .PurchaseOrderProduct
                .Include(p => p.Product)
                .Where(p => p.PurchaseOrderId == filter.PurchaseOrderId);
        }

        public async Task<PurchaseOrderProduct?> FindPurchaseOrderProduct(int id)
        {
            return await this._database
                .PurchaseOrderProduct
                .Where(p => p.Id == id)
                .FirstOrDefaultAsync();
        }
    }
}