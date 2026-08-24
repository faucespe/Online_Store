using API.Data;
using API.DataTransferObjects;
using API.Services;

namespace API.Validators
{
    public class ProductValidator : IProductValidator
    {
        private readonly StoreDB _database;

        public ProductValidator(StoreDB database)
        {
            this._database = database;
        }
        public bool ValidateInsertUpdateProductDTO(int? id, InsertUpdateProductDTO data, List<string> messages)
        {
            List<string> innerMessages = new();

            // Name
            if (string.IsNullOrWhiteSpace(data.Name))
            {
                innerMessages.Add("Name is required");
            }
            else if (data.Name?.Length > 60)
            {
                innerMessages.Add("Name must be less than or equal to 60 characters");
            }

            // Description
            if (string.IsNullOrWhiteSpace(data.Description))
            {
                innerMessages.Add("Description is required");
            }
            else if (data.Description?.Length > 500)
            {
                innerMessages.Add("Description must be less than or equal to 500 characters");
            }

            // ImageUrl
            // - Optional
            // - If provided, must be a valid URL
            // - Maximum length according to database

            // Price
            if (data.Price == 0)
            {
                innerMessages.Add("Price is required");
            }
            else if (data.Price < 0)
            {
                innerMessages.Add("Price must be greater than 0");
            }

            // IdCategory
            if (data.IdCategory <= 0)
            {
                innerMessages.Add("Category is required");
            }
            else if (!this._database.Category.Any(c => c.Id == data.IdCategory))
            {
                innerMessages.Add("Category does not exist, you need to select a valid category");
            }

            // IdStatus
            if (data.IdStatus <= 0)
            {
                innerMessages.Add("Status is required");
            }
            else if (!this._database.ProductStatus.Any(s => s.Id == data.IdStatus))
            {
                innerMessages.Add("Status does not exist, you need to select a valid status");
            }

            // Stock
            if (data.Stock <= 0)
            {
                innerMessages.Add("Stock must be greater than or equal to 0");
            }

            // CreatedAt
            if (!data.CreatedAt.HasValue)
            {
                innerMessages.Add("CreatedAt is required");
            }
            else if (data.CreatedAt > DateTime.Now)
            {
                innerMessages.Add("CreatedAt must be less than or equal to the current date/time");
            }

            // UpdatedAt
            if (data.UpdatedAt > DateTime.Now)
            {
                innerMessages.Add("UpdatedAt must be less than or equal to the current date/time");
            }
            else if (data.UpdatedAt <= data.CreatedAt)
            {
                innerMessages.Add("UpdatedAt must be later than CreatedAt");
            }

            messages.AddRange(innerMessages);

            return !innerMessages.Any();
        }
    }
}