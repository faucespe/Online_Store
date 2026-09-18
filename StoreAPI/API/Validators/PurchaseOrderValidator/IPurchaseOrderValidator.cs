using API.DataTransferObjects;

namespace API.Validators
{
    public interface IPurchaseOrderValidator
    {
        Task<bool> ValidateCreateUpdatePurchaseOrder(int? id, CreatePurchaseOrderDto data, List<string> messages);
        bool ValidateFilterPurchaseOrderDto(FilterPurchaseOrderDto data, List<string> messages);
    }
}
