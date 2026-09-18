using API.DataTransferObjects;

namespace API.Validators
{
    public interface ICategoryValidator
    {   
        bool ValidateCreateUpdateCategory(int? id, CreateUpdateCategoryDto data, List<string> messages);

    }
}
