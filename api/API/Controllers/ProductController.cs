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
        public async Task<ActionResult<APIResponse>> ListProducts([FromQuery] FilterProductDTO data)
        {
            ProductFilters filter = this._mapper.Map<FilterProductDTO, ProductFilters>(data);
            List<Product> list = await this._productService.ListProducts(filter)
                .OrderBy(p => p.Name)
                .ThenBy(p => p.Price)
                .ToListAsync();

            APIResponse response = new()
            {
                Data = list.Select(p => this._mapper.Map<Product, GetProductDTO>(p))
            };

            return response;
        }

        [HttpGet("{id}")]
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

        [HttpPost]
        public async Task<ActionResult<APIResponse>> InsertProduct(InsertUpdateProductDTO data)
        {
            APIResponse response = new();
            response.Success = this._productValidator.ValidateInsertUpdateProductDTO(null, data, response.Messages);

            if (response.Success)
            {
                Product product = this._mapper.Map<InsertUpdateProductDTO, Product>(data);
                await this._productService.InsertProduct(product);
                response.Data = this._mapper.Map<Product, GetProductDTO>(product);
                response.Messages.Add("Product has been inserted");
            }

            return response;
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult<APIResponse>> UpdateProduct(int id, InsertUpdateProductDTO data)
        {
            Product? product = await this._productService.FindProduct(id);
            if (product == null)
            {
                return HttpErrors.NotFound("Product does not exist in the system");
            }

            APIResponse response = new();
            response.Success = this._productValidator.ValidateInsertUpdateProductDTO(id, data, response.Messages);

            if (response.Success)
            {
                this._mapper.Map(data, product);
                await this._productService.UpdateProduct(product);
                response.Data = this._mapper.Map<Product, GetProductDTO>(product);
                response.Messages.Add("Product has been updated");
            }

            return response;
        }
    }
}
