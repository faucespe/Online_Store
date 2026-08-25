using API.Data.Models;

namespace API.Services
{
    public interface IPurchaseOrderService
    {
        IQueryable<PurchaseOrder> ListPurchaseOrders();
    }
}