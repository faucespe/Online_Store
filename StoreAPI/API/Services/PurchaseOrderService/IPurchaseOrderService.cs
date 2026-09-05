using API.Data.Filters;
using API.Data.Models;

namespace API.Services
{
    public interface IPurchaseOrderService
    {
        IQueryable<PurchaseOrder> ListPurchaseOrders(PurchaseOrderFilters? filter = null);
        Task<PurchaseOrder?> FindPurchaseOrder(int id);
    }
}