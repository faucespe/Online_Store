using API.Data.Models;

namespace API.Services
{
    public interface IPurchaseOrderProductService
    {
        IQueryable<PurchaseOrderProduct> ListPurchaseOrderProducts();
    }
}