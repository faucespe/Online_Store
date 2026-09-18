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
            CreateMap<Category, GetCategoryDto>();
            CreateMap<Category, CreateUpdateCategoryDto>();
            CreateMap<CreateUpdateCategoryDto, Category>();
            CreateMap<CategoryFiltersDto, CategoryFilters>();
        }
    }
}
