using API.Data.Filters;
using API.Data.Models;
using API.DataTransferObjects;
using AutoMapper;

namespace API.Mapper
{
    public class CategoryMapper : Profile
    {
        public CategoryMapper() 
        {
            CreateMap<Category, GetCategoryDTO>();
            CreateMap<Category, CreateUpdateCategoryDTO>();
            CreateMap<CreateUpdateCategoryDTO, Category>();
            CreateMap<CategoryFiltersDTO, CategoryFilters>();
        }
    }
}
