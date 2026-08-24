using API.Data.Models;
using API.DataTransferObjects;
using API.Services;
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
        
        public CategoryController(IMapper mapper, ICategoryService categoryService)
        {
            this._mapper = mapper;
            this._categoryService = categoryService;
        }

        public ICategoryService CategoryService { get; }

        [HttpGet]
        public async Task<ActionResult<ApiResponse>> ListCategories()
        {
           List<Category> list = await this._categoryService.ListCategory().ToListAsync();

            ApiResponse response = new ApiResponse()
            {
                Data = list.Select(C => this._mapper.Map<Category, GetCategoryDTO>(C) )
            };
            

            return response;
        }
    }
}