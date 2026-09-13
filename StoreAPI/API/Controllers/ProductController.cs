using API.Data.Filters;
using API.Data.Models;
using API.DataTransferObjects;
using API.Services;
using API.Validators;
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
        private readonly IProductValidator _productValidator;

        public ProductController(IMapper mapper, IProductService productService, IProductValidator productValidator)
        {
            this._mapper = mapper;
            this._productService = productService;
            this._productValidator = productValidator;
        }
        public IProductService ProductService { get; }

        [HttpGet]
        public async Task<ActionResult<ApiResponse>> ListProducts([FromQuery] FilterProductDto data)
        {
            ProductFilters filter = this._mapper.Map<FilterProductDto, ProductFilters>(data);
            List<Product> list = await this._productService.ListProducts(filter)
                .OrderBy(p => p.Id)
                .ThenBy(p => p.Name)
                .ToListAsync();

            ApiResponse response = new()
            {
                Data = list.Select(p => this._mapper.Map<Product, GetProductDto>(p))
            };

            return response;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse>> FindProduct(int id)
        {
            Product? product = await this._productService.FindProduct(id);

            if (product == null)
            {
                return HttpErrors.NotFound("Product does not exist in the system");
            }

            ApiResponse response = new ApiResponse()
            {
                Data = this._mapper.Map<Product, GetProductDto>(product)
            };
            return response;
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse>> InsertProduct(InsertUpdateProductDto data)
        {
            ApiResponse response = new();
            response.Success = this._productValidator.ValidateInsertUpdateProductDto(null, data, response.Messages);

            if (response.Success)
            {
                Product product = this._mapper.Map<InsertUpdateProductDto, Product>(data);
                await this._productService.InsertProduct(product);
                response.Data = this._mapper.Map<Product, GetProductDto>(product);
                response.Messages.Add("Product has been inserted");
            }

            return response;
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult<ApiResponse>> UpdateProduct(int id, InsertUpdateProductDto data)
        {
            Product? product = await this._productService.FindProduct(id);
            if (product == null)
            {
                return HttpErrors.NotFound("Product does not exist in the system");
            }

            ApiResponse response = new();
            response.Success = this._productValidator.ValidateInsertUpdateProductDto(id, data, response.Messages);

            if (response.Success)
            {
                this._mapper.Map(data, product);
                await this._productService.UpdateProduct(product);
                response.Data = this._mapper.Map<Product, GetProductDto>(product);
                response.Messages.Add("Product has been updated");
            }

            return response;
        }
    }
}
