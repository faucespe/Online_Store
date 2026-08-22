using API.Data.Models;


namespace API.Services
{
    public interface IProductService
    {
        IQueryable<Product> ListProduct();
    }
}