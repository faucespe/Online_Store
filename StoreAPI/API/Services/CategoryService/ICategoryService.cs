using API.Data.Filters;
using API.Data.Models;

namespace API.Services
{
    public interface ICategoryService
    {
        IQueryable<Category> ListCategories(CategoryFilters? filters);
        Task<Category?> GetCategory(int id);
        Task CreateCategory(Category category);
        Task UpdateCategory(Category category);
    }
}
