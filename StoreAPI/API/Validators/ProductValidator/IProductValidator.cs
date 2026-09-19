using API.DataTransferObjects;

namespace API.Validators
{
    public interface IProductValidator
    {
        bool ValidateInsertUpdateProductDto(int? id, InsertUpdateProductDto data, List<string> messages);
        bool ValidateFilterProductDto(FilterProductDto data, List<string> messages);
    }
}