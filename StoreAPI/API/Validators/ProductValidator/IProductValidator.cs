using API.DataTransferObjects;

namespace API.Validators
{
    public interface IProductValidator
    {
        bool ValidateInsertUpdateProductDTO(int? id, InsertUpdateProductDTO data, List<string> messages);
    }
}