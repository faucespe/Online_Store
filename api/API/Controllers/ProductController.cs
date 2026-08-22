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

        [HttpGet("{id}")]
        [Route("{id:int}")]
        public async Task<ActionResult<APIResponse>> FindProduct(int id)
        {
            Product? product = await this._productService.FindProduct(id);

            if (product == null)
            {
                return HttpErrors.NotFound("Product does not exist in the system");
            }

            APIResponse response = new APIResponse()
            {
                Data = this._mapper.Map<Product, GetProductDTO>(product)
            };
            return response;
        }
    }
}