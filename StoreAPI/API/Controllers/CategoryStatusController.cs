using API.Data.Models;
using API.DataTransferObjects;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/category-status")]
    [ApiController]
    public class CategoryStatusController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ICategoryStatusService _categoryStatusService;

        public CategoryStatusController(IMapper mapper, ICategoryStatusService categoryStatusService)
        {
            this._mapper = mapper;
            this._categoryStatusService = categoryStatusService;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse>> ListCategoryStatus()
        {
            List<CategoryStatus> list = await this._categoryStatusService.ListCategoryStatus().ToListAsync();
            ApiResponse response = new()
            {
                Data = list.Select(cs => this._mapper.Map<CategoryStatus, GetCategoryStatusDto>(cs))
            };
            return response;
        }
    }

}