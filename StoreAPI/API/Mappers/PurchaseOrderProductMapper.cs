using API.Data.Filters;
using API.Data.Models;
using API.DataTransferObjects;
using AutoMapper;

namespace API.Mapper
{
    public class PurchaseOrderProductMapper : Profile
    {
        public PurchaseOrderProductMapper()
        {
            CreateMap<PurchaseOrderProduct, GetPurchaseOrderProductDto>();
            CreateMap<FilterPurchaseOrderProductDto, PurchaseOrderProductFilters>();
            CreateMap<CreatePurchaseOrderProductDto, PurchaseOrderProduct>();
        }
    }
}