using API.Data.Models;

namespace API.Services
{
    public interface ICategoryService
    {
        IQueryable<Category> ListCategory();
    }
}
