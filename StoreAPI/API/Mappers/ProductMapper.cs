using API.Data.Filters;
using API.Data.Models;
using API.DataTransferObjects;
using AutoMapper;

namespace API.Mapper
{
    public class ProductMapper : Profile
    {
        public ProductMapper()
        {
            CreateMap<Product, GetProductDto>();
            CreateMap<InsertUpdateProductDto, Product>();
            CreateMap<FilterProductDto, ProductFilters>();
        }
    }
}