using API.DataTransferObjects;

namespace API.Validators
{
    public interface ICategoryValidator
    {   
        bool ValidateCreateUpdateCategory(int? id, CreateUpdateCategoryDTO data, List<string> messages);

    }
}
