using API.Data;
using API.Data.Models;

namespace API.Services
{
    public class CategoryStatusService : ICategoryStatusService
    {
        private readonly StoreDB _database;
        public CategoryStatusService(StoreDB database)
        {
            this._database = database;
        }
        public StoreDB Database { get; }
        public IQueryable<CategoryStatus> ListCategoryStatus()
        {
            return this._database.CategoryStatus;
        }
    }
}
