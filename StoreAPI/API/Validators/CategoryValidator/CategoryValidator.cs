using API.Data;
using API.DataTransferObjects;

namespace API.Validators
{
    public class CategoryValidator : ICategoryValidator
    {
        private readonly StoreDB _Database;

        public CategoryValidator(StoreDB database)
        {
            this._Database = database;
        }

        public bool ValidateCreateUpdateCategory(int? id, CreateUpdateCategoryDTO data, List<string> messages)
        {
            List<string> innerMessages = new();

            //Name
            if (string.IsNullOrWhiteSpace(data.Name))
            { 
                innerMessages.Add("Name is required.");
            }
            else if (data.Name.Trim().Length > 60)
            {
                innerMessages.Add("Name must be less than or equal to 60 characters.");
            }

            //Status
            if (!data.CategoryStatusId.HasValue)
            {
                innerMessages.Add("Status is required.");
            }
            else if (!this._Database.CategoryStatus.Any(s => s.Id == data.CategoryStatusId))
            {
                innerMessages.Add("Invalid status provided.");
            }

            messages.AddRange(innerMessages);

            return !innerMessages.Any();
        }
    }
}