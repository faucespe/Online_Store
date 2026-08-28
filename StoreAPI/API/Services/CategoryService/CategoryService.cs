using API.Data;
using API.Data.Filters;
using API.Data.Models;
using Microsoft.EntityFrameworkCore;
using System.Runtime.InteropServices;

namespace API.Services
{
    public class CategoryService : ICategoryService
    { 
        private readonly StoreDB _database;
        public CategoryService(StoreDB database)
        {
            this._database = database;
        }

        public StoreDB Database { get; }

        public IQueryable<Category> ListCategories(CategoryFilters? filter = null)
        {
            filter ??= new CategoryFilters();

            return this._database.Category
                            .Include(c => c.IdStatusNavigation)
                            .Where(c => (string.IsNullOrEmpty(filter.Name) || c.Name.Contains(filter.Name))
                                && (!filter.IdStatus.HasValue || c.IdStatus == filter.IdStatus));
        }

        public async Task<Category?> GetCategory(int id)
        {
            return await this._database
                            .Category
                            .Include(c => c.IdStatusNavigation)
                            .Where(c => c.Id == id)
                            .FirstOrDefaultAsync();
        }

        public async Task CreateCategory(Category category)
        {
            this._database.Category.Add(category);
            await this._database.SaveChangesAsync();
            await this._database.Entry(category).Reference(c => c.IdStatusNavigation).LoadAsync();
        }

        public async Task UpdateCategory(Category category)
        {
            this._database.Category.Update(category);
            await this._database.SaveChangesAsync();
            await this._database.Entry(category).Reference(c => c.IdStatusNavigation).LoadAsync();
        }
    }
}
