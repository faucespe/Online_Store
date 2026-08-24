using API.Data;
using API.Data.Models;

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
        public IQueryable<PurchaseOrderProduct> ListPurchaseOrderProducts()
        {
            return this._database.PurchaseOrderProduct;
        }
    }
}