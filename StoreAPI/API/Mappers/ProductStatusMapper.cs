using API.Data.Models;
using API.DataTransferObjects;
using AutoMapper;

namespace API.Mapper
{
    public class ProductStatusMapper : Profile
    {
        public ProductStatusMapper()
        {
            CreateMap<ProductStatus, GetProductStatusDTO>();
        }
    }
}