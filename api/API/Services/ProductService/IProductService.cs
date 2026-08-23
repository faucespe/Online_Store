using API.Data.Models;


namespace API.Services
{
    public interface IProductService
    {
        IQueryable<Product> ListProduct();
        Task<Product?> FindProduct(int id);
        Task InsertProduct(Product entity);
    }
}