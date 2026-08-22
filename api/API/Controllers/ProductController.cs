using API.Data.Models;
using API.DataTransferObjects;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IProductService _productService;
        public ProductController(IMapper mapper, IProductService productService)
        {
            this._mapper = mapper;
            this._productService = productService;
        }
        public IProductService ProductService { get; }

        [HttpGet]
        public async Task<ActionResult<APIResponse>> ListProducts()
        {
            List<Product> list = await this._productService.ListProduct().ToListAsync();

            APIResponse response = new APIResponse()
            {
                Data = list.Select(P => this._mapper.Map<Product, GetProductDTO>(P))
            };
            return response;
        }
    }
}