using API.Data;
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
    [Route("api/categories")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ICategoryService _categoryService;
        private readonly ICategoryValidator _categoryValidator;

        public CategoryController(IMapper mapper, ICategoryService categoryService, ICategoryValidator categoryValidator)
        {
            this._mapper = mapper;
            this._categoryService = categoryService;
            this._categoryValidator = categoryValidator;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse>> ListCategories([FromQuery] CategoryFiltersDTO data)
        {
            CategoryFilters filter = this._mapper.Map<CategoryFiltersDTO, CategoryFilters>(data);
            List<Category> list = await this._categoryService.ListCategories(filter).ToListAsync();

            ApiResponse response = new ApiResponse
            {
                Data = list.Select(C => this._mapper.Map<Category, GetCategoryDTO>(C) )
            };
            
            return response;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<ApiResponse>> GetCategory(int id)
        {
            Category category = await this._categoryService.GetCategory(id);
            if (category == null) 
            {
                return HttpErrors.NotFound("Category not found");
            }

            ApiResponse response = new ApiResponse
            {
                Data = this._mapper.Map<Category?, GetCategoryDTO?>(category)
            };
            return response;
        }


        [HttpPost]
         public async Task<ActionResult<ApiResponse>> CreateCategory(CreateUpdateCategoryDTO data)
         {
            ApiResponse response = new();
            response.Success = this._categoryValidator.ValidateCreateUpdateCategory(null, data, response.Messages);

            if (response.Success)
            {
                Category category = this._mapper.Map<CreateUpdateCategoryDTO, Category>(data);
                await this._categoryService.CreateCategory(category);
                response.Data = this._mapper.Map<Category, CreateUpdateCategoryDTO>(category);
                response.Messages.Add("Category was created successfully");
            }

            return response;
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult<ApiResponse>> UpdateCategory(int id, CreateUpdateCategoryDTO data)
        {
            Category?  category = await this._categoryService.GetCategory(id);
            if (category == null)
            {
                return HttpErrors.NotFound("Category not found");
            }

            ApiResponse response = new();
            response.Success = this._categoryValidator.ValidateCreateUpdateCategory(id, data, response.Messages);

            if (response.Success)
            {
                this._mapper.Map(data, category);
                await this._categoryService.UpdateCategory(category);
                response.Data = this._mapper.Map<Category, CreateUpdateCategoryDTO>(category);
                response.Messages.Add("Category updated successfully");

            }

            return response;
        }
    }
}