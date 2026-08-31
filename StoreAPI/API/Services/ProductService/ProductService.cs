using API.Data;
using API.Data.Filters;
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

        public IQueryable<Product> ListProducts(ProductFilters? filter = null)
        {
            filter ??= new ProductFilters();

            return this._database
                    .Product
                    .Include(p => p.Category)
                        .ThenInclude(c => c.CategoryStatus)
                    .Include(p => p.ProductStatus)
                    .Where(p => (string.IsNullOrWhiteSpace(filter.Name) || p.Name.Contains(filter.Name))
                    && (!filter.MinPrice.HasValue || p.Price >= filter.MinPrice.Value)
                    && (!filter.MaxPrice.HasValue || p.Price <= filter.MaxPrice.Value)
                    && (!filter.CategoryId.HasValue || p.CategoryId == filter.CategoryId.Value)
                    && (!filter.ProductStatusId.HasValue || p.ProductStatusId == filter.ProductStatusId.Value)
                    );
        }

        public async Task<Product?> FindProduct(int id)
        {
            return await this._database
                .Product
                .Include(p => p.Category)
                    .ThenInclude(c => c.CategoryStatus)
                .Include(p => p.ProductStatus)
                .Where(p => p.Id == id)
                .FirstOrDefaultAsync();
        }

        public async Task InsertProduct(Product entity)
        {
            this._database.Product.Add(entity);
            await this._database.SaveChangesAsync();
        }

        public async Task UpdateProduct(Product entity)
        {
            this._database.Product.Update(entity);
            await this._database.SaveChangesAsync();
        }
    }
}
