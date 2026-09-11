using API.DataTransferObjects;

namespace API.Validators
{
    public interface IPurchaseOrderValidator
    {
        Task<bool> ValidateCreateUpdatePurchaseOrder(int? id, CreateUpdatePurchaseOrderDTO data, List<string> messages);

    }
}
