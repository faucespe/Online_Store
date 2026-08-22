using API.Data;
using API.Data.Models;

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
        public IQueryable<PurchaseOrder> ListPurchaseOrders()
        {
            return this._database.PurchaseOrder;
        }
    }
}