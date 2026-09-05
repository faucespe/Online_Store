using API.Data.Models;
using API.Data.Filters;

namespace API.Services
{
    public interface IPurchaseOrderProductService
    {
        IQueryable<PurchaseOrderProduct> ListPurchaseOrderProducts(PurchaseOrderProductFilters? filter = null);
        Task<PurchaseOrderProduct?> FindPurchaseOrderProduct(int id);
    }
}