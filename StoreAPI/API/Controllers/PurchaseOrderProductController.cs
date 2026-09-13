using API.Data.Filters;
using API.Data.Models;
using API.DataTransferObjects;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/purchase-order-products")]
    [ApiController]
    public class PurchaseOrderProductController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IPurchaseOrderProductService _purchaseOrderProductService;

        public PurchaseOrderProductController(IMapper mapper, IPurchaseOrderProductService purchaseOrderProductService)
        {
            this._mapper = mapper;
            this._purchaseOrderProductService = purchaseOrderProductService;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse>> ListPurchaseOrderProducts([FromQuery] FilterPurchaseOrderProductDto data)
        {
            PurchaseOrderProductFilters filter = this._mapper.Map<FilterPurchaseOrderProductDto, PurchaseOrderProductFilters>(data);
            List<PurchaseOrderProduct> list = await this._purchaseOrderProductService.ListPurchaseOrderProducts(filter)
                .OrderBy(p => p.Id)
                .ToListAsync();
            ApiResponse response = new ApiResponse()
            {
                Data = list.Select(CS => this._mapper.Map<PurchaseOrderProduct, GetPurchaseOrderProductDto>(CS))
            };
            return response;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse>> FindPurchaseOrderProduct(int id)
        {
            PurchaseOrderProduct? purchaseOrderProduct = await this._purchaseOrderProductService.FindPurchaseOrderProduct(id);

            if (purchaseOrderProduct == null)
            {
                return HttpErrors.NotFound("Purchase order product does not exist in the system");
            }

            ApiResponse response = new ApiResponse()
            {
                Data = this._mapper.Map<PurchaseOrderProduct, GetPurchaseOrderProductDto>(purchaseOrderProduct)
            };
            return response;
        }
    }
}
