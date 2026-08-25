using API.Data.Models;
using API.DataTransferObjects;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/product-status")]
    [ApiController]
    public class ProductStatusController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IProductStatusService _productStatusService;
        public ProductStatusController(IProductStatusService productStatusService, IMapper mapper)
        {
            this._productStatusService = productStatusService;
            this._mapper = mapper;
        }

        public IProductStatusService ProductStatusService { get; }

        [HttpGet]
        public async Task<ActionResult<ApiResponse>> ListProductStatus()
        {
            List<ProductStatus> list = await this._productStatusService.ListProductStatus().ToListAsync();
            ApiResponse response = new ApiResponse()
            {
                Data = list.Select(PS => this._mapper.Map<ProductStatus, GetProductStatusDTO>(PS))
            };
            return response;
        }


    }
}
