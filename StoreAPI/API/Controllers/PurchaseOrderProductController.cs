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

        public IPurchaseOrderProductService PurchaseOrderProductService { get; }

        [HttpGet]
        public async Task<ActionResult<ApiResponse>> ListPurchaseOrderProducts()
        {
            List<PurchaseOrderProduct> list = await this._purchaseOrderProductService.ListPurchaseOrderProducts().ToListAsync();
            ApiResponse response = new ApiResponse()
            {
                Data = list.Select(CS => this._mapper.Map<PurchaseOrderProduct, GetPurchaseOrderProductDTO>(CS))
            };
            return response;
        }
    }
}