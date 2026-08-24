using API.Data.Models;
using API.DataTransferObjects;
using AutoMapper;

namespace API.Mapper
{
    public class CategoryStatusMapper : Profile
    {
        public CategoryStatusMapper()
        {
            CreateMap<CategoryStatus, GetCategoryStatusDTO>();
        }
    }
}
