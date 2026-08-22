using API.Data;
using API.Data.Models;

namespace API.Services
{
    public class ProductStatusService : IProductStatusService
    {
        private readonly StoreDB _database;
        public ProductStatusService(StoreDB database)
        {
            this._database = database;
        }
        public StoreDB Database { get; }
        public IQueryable<ProductStatus> ListProductStatus()
        {
            return this._database.ProductStatus;
        }
    }
}