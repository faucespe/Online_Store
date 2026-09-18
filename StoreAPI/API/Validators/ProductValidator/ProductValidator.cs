using API.Data;
using API.DataTransferObjects;
using API.Services;

namespace API.Validators
{
    public class ProductValidator : IProductValidator
    {
        private readonly StoreDB _database;
        private const decimal MaxPrice = 99_999_999.99m;

        public ProductValidator(StoreDB database)
        {
            this._database = database;
        }
        public bool ValidateInsertUpdateProductDto(int? id, InsertUpdateProductDto data, List<string> messages)
        {
            List<string> innerMessages = new();

            // Name
            if (string.IsNullOrWhiteSpace(data.Name))
            {
                innerMessages.Add("Name is required.");
            }
            else if (data.Name?.Length > 60)
            {
                innerMessages.Add("Name must be less than or equal to 60 characters.");
            }

            // Description
            if (string.IsNullOrWhiteSpace(data.Description))
            {
                innerMessages.Add("Description is required.");
            }
            else if (data.Description?.Length > 500)
            {
                innerMessages.Add("Description must be less than or equal to 500 characters.");
            }

            //ImageURL
            if (!string.IsNullOrWhiteSpace(data.ImageUrl))
            {
                if (!Uri.TryCreate(data.ImageUrl, UriKind.Absolute, out Uri? uri) ||
                    (uri.Scheme != Uri.UriSchemeHttp &&
                     uri.Scheme != Uri.UriSchemeHttps))
                {
                    innerMessages.Add("Invalid image URL");
                }
                else if (!uri.AbsolutePath.EndsWith(".jpg", StringComparison.OrdinalIgnoreCase) &&
                         !uri.AbsolutePath.EndsWith(".jpeg", StringComparison.OrdinalIgnoreCase) &&
                         !uri.AbsolutePath.EndsWith(".png", StringComparison.OrdinalIgnoreCase))
                {
                    innerMessages.Add("Image URL must end with .jpg, .jpeg or .png");
                }
            }

            // Price
            if (data.Price == 0)
            {
                innerMessages.Add("Price is required.");
            }
            else if (data.Price < 0)
            {
                innerMessages.Add("Price must be greater than 0.");
            }
            else if (data.Price > MaxPrice)
            {
                innerMessages.Add($"Price must be less than or equal to {MaxPrice:N2}.");
            }

            // CategoryId
            if (!data.CategoryId.HasValue)
            {
                innerMessages.Add("Category is required.");
            }
            else if (data.CategoryId.Value <= 0)
            {
                innerMessages.Add("Category must be a valid category.");
            }
            else if (!this._database.Category.Any(c => c.Id == data.CategoryId.Value))
            {
                innerMessages.Add("Category does not exist, you need to select a valid category.");
            }
            

            // IdStatus
            if (data.ProductStatusId < 0)
            {
                innerMessages.Add("Status is required.");
            }
            else if (!this._database.ProductStatus.Any(s => s.Id == data.ProductStatusId))
            {
                innerMessages.Add("Status does not exist, you need to select a valid status.");
            }

            // Stock
            if (data.Stock < 0)
            {
                innerMessages.Add("Stock must be greater than or equal to 0.");
            }

            // CreatedAt Validations only for back end
            if (data.CreatedAt.HasValue)
            {
                if (data.CreatedAt > DateTime.Now)
                {
                    innerMessages.Add("CreatedAt must be less than or equal to the current date/time.");
                }
            }

            // UpdatedAt, Validations only for back end
            if (data.UpdatedAt.HasValue)
            {
                if (data.UpdatedAt > DateTime.Now)
                {
                    innerMessages.Add("UpdatedAt must be less than or equal to the current date/time.");
                }
            }

            messages.AddRange(innerMessages);

            return !innerMessages.Any();
        }

        public bool ValidateFilterProductDto(FilterProductDto data, List<string> messages)
        {
            List<string> innerMessages = new();

            // MinPrice
            if (data.MinPrice.HasValue)
            {
                if (data.MinPrice < 0)
                {
                    innerMessages.Add("Minimum price must be greater than or equal to 0.");
                }
                else if (data.MinPrice > MaxPrice)
                {
                    innerMessages.Add($"Minimum price must be less than or equal to {MaxPrice:N2}.");
                }
            }

            // MaxPrice
            if (data.MaxPrice.HasValue)
            {
                if (data.MaxPrice < 0)
                {
                    innerMessages.Add("Maximum price must be greater than or equal to 0.");
                }
                else if (data.MaxPrice > MaxPrice)
                {
                    innerMessages.Add($"Maximum price must be less than or equal to {MaxPrice:N2}.");
                }
            }

            // MinPrice vs MaxPrice
            if (data.MinPrice.HasValue && data.MaxPrice.HasValue && data.MinPrice > data.MaxPrice)
            {
                innerMessages.Add("Minimum price cannot be greater than maximum price.");
            }

            messages.AddRange(innerMessages);

            return !innerMessages.Any();
        }
    }
}
