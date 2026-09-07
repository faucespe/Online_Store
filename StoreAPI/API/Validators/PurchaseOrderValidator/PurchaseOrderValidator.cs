using API.Data;
using API.DataTransferObjects;

namespace API.Validators
{
    public class PurchaseOrderValidator : IPurchaseOrderValidator
    {
        private readonly StoreDB _Database;

        public PurchaseOrderValidator(StoreDB database)
        {
            this._Database = database;
        }

        public bool ValidateCreateUpdatePurchaseOrder(int? id, CreateUpdatePurchaseOrderDTO data, List<string> messages)
        {
            List<string> innerMessages = new();

            //CustomerName
            if (string.IsNullOrWhiteSpace(data.CustomerName))
            { 
                innerMessages.Add("CustomerName is required.");
            }
            else if (data.CustomerName.Trim().Length > 50)
            {
                innerMessages.Add("CustomerName must be less than or equal to 50 characters.");
            }

            //CustomerPhoneNumber
            if (string.IsNullOrWhiteSpace(data.CustomerPhoneNumber))
            { 
                innerMessages.Add("CustomerPhoneNumber is required.");
            }
            else if (data.CustomerPhoneNumber.Trim().Length > 8)
            {
                innerMessages.Add("CustomerPhoneNumber must be less than or equal to 8 characters.");
            }

            //CustomerAddress
            if (string.IsNullOrWhiteSpace(data.CustomerAddress))
            { 
                innerMessages.Add("CustomerAddress is required.");
            }
            else if (data.CustomerAddress.Trim().Length > 100)
            {
                innerMessages.Add("CustomerAddress must be less than or equal to 100 characters.");
            }

            //CustomerEmail
            if (string.IsNullOrWhiteSpace(data.CustomerEmail))
            { 
                innerMessages.Add("CustomerEmail is required.");
            }
            else if (data.CustomerEmail.Trim().Length > 100)
            {
                innerMessages.Add("CustomerEmail must be less than or equal to 100 characters.");
            }

            messages.AddRange(innerMessages);

            return !innerMessages.Any();
        }
    }
}