using API.DataTransferObjects;

namespace API.Validators
{
    public interface IPurchaseOrderValidator
    {
        Task<bool> ValidateCreateUpdatePurchaseOrder(int? id, CreatePurchaseOrderDto data, List<string> messages);

    }
}
