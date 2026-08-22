using API.Data.Models;

namespace API.Services
{
    public interface ICategoryStatusService
    {
        IQueryable<CategoryStatus> ListCategoryStatus();
    }
}
