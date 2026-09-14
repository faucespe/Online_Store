using API.Data.Filters;
using API.Data.Models;
using API.DataTransferObjects;

namespace API.Services
{
    public interface IPurchaseOrderService
    {
        IQueryable<PurchaseOrder> ListPurchaseOrders(PurchaseOrderFilters? filter = null);
        Task<PurchaseOrder?> FindPurchaseOrder(int id);
        Task InsertPurchaseOrder(PurchaseOrder entity);
    }
}