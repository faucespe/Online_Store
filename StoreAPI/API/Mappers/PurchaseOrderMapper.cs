using API.Data.Filters;
using API.Data.Models;
using API.DataTransferObjects;
using AutoMapper;

namespace API.Mapper
{
    public class PurchaseOrderMapper : Profile
    {
        public PurchaseOrderMapper()
        {
            CreateMap<PurchaseOrder, GetPurchaseOrderDTO>();
            CreateMap<CreateUpdatePurchaseOrderDTO, PurchaseOrder>();
            CreateMap<FilterPurchaseOrderDTO, PurchaseOrderFilters>();
        }
    }
}