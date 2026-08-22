using API.Data;
using API.Data.Models;
using Microsoft.EntityFrameworkCore;

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

        public async Task<Product?> FindProduct(int id)
        {
            return await this._database
                .Product
                .Where(p => p.Id == id)
                .FirstOrDefaultAsync();
        }
    }
}