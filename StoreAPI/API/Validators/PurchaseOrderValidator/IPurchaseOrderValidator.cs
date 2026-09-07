using API.DataTransferObjects;

namespace API.Validators
{
    public interface IPurchaseOrderValidator
    {   
        bool ValidateCreateUpdatePurchaseOrder(int? id, CreateUpdatePurchaseOrderDTO data, List<string> messages);

    }
}
