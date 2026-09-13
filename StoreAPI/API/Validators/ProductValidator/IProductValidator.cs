using API.DataTransferObjects;

namespace API.Validators
{
    public interface IProductValidator
    {
        bool ValidateInsertUpdateProductDto(int? id, InsertUpdateProductDto data, List<string> messages);
    }
}