using API.Data;
using API.Data.Models;

namespace API.Services
{
    public class ProductService : IProductService
    {
        private readonly StoreDB _database;
        public ProductService(StoreDB database)
        {
            this._database = database;
        }
        public StoreDB Database { get; }
        public IQueryable<Product> ListProduct()
        {
            return this._database.Product;
        }
    }
}