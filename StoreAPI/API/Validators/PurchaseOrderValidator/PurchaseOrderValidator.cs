using API.Data;
using API.Data.Models;
using API.DataTransferObjects;
using API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Scaffolding.Metadata;
using System.Globalization;

namespace API.Validators
{
    public class PurchaseOrderValidator : IPurchaseOrderValidator
    {
        private const decimal maxGT = 99_999_999.99m;
        private readonly StoreDB _Database;
        private readonly IProductService _productService;

        public PurchaseOrderValidator(StoreDB database, IProductService productService)
        {
            this._Database = database;
            this._productService = productService;
        }

        public async Task<bool> ValidateCreateUpdatePurchaseOrder(int? id, CreatePurchaseOrderDto data, List<string> messages)
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
            else if (!IsValidEmail(data.CustomerEmail.Trim()))
            {
                innerMessages.Add("CustomerEmail must have a valid email format.");
            }

            //CartProductList
            List<Product> productList = await this._productService.ListProducts().OrderBy(p => p.Id).ToListAsync();
            List<CreatePurchaseOrderProductDto> cartProducts = data.PurchaseOrderProduct.ToList();

            if (!cartProducts.Any())
            {
                innerMessages.Add("Cart products list can not be empty.");
            }

            bool hasDuplicatedProducts = cartProducts.DistinctBy(cp => cp.ProductId).Count() != cartProducts.Count;
            if (hasDuplicatedProducts)
            {
                innerMessages.Add("Cart can't contain duplicated products.");
            }

            foreach (CreatePurchaseOrderProductDto cartProduct in cartProducts)
            {
                bool cartProductExist = false;
                bool hasEnoughStock = true;
                foreach (Product product in productList)
                {
                    // Check if the product exists
                    if (product.Id != cartProduct.ProductId)
                    {
                        continue;
                    }

                    cartProductExist = true;

                    // Check if the product has enough stock
                    if (product.Stock < cartProduct.ProductQuantity || cartProduct.ProductQuantity <= 0)
                    {
                        hasEnoughStock = false;
                        break;
                    }

                    break;
                }
                if (!cartProductExist)
                {
                    innerMessages.Add("There is a product that doesn't exist.");
                }
                if (!hasEnoughStock)
                {
                    innerMessages.Add("There is a product that doesn't have enough stock.");
                }
            }

            messages.AddRange(innerMessages);

            return !innerMessages.Any();
        }

        private static bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }


        public bool ValidateFilterPurchaseOrderDto(FilterPurchaseOrderDto data, List<string> messages)
        {

            List<string> innerMessages = new();


            // GrandTotalFrom
            if (data.GrandTotalFrom.HasValue)
            {
                if (data.GrandTotalFrom < 0)
                {
                    innerMessages.Add("Minimum total must be greater than or equal to 0.");
                }
                else if (data.GrandTotalFrom > maxGT)
                {
                    innerMessages.Add($"Minimum total must be less than or equal to {maxGT.ToString("N2", CultureInfo.InvariantCulture)}.");
                }
            }

            // GrandTotalTo
            if (data.GrandTotalTo.HasValue)
            {
                if (data.GrandTotalTo < 0)
                {
                    innerMessages.Add("Maximum total must be greater than or equal to 0.");
                }
                else if (data.GrandTotalTo > maxGT)
                {
                    innerMessages.Add($"Maximum total must be less than or equal to {maxGT.ToString("N2", CultureInfo.InvariantCulture)}.");
                }
            }

            // GrandTotalFrom vs GrandTotalTo
            if (data.GrandTotalFrom.HasValue && data.GrandTotalTo.HasValue && data.GrandTotalFrom > data.GrandTotalTo)
            {
                innerMessages.Add("Minimum total cannot be greater than maximum total.");
            }

            messages.AddRange(innerMessages);

            return !innerMessages.Any();
        }
    }
}