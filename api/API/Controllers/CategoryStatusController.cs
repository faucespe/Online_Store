using API.Data.Models;
using API.DataTransferObjects;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Http;
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

        public ICategoryStatusService CategoryStatusService { get; }

        [HttpGet]
        public async Task<ActionResult<APIResponse>> ListCategoryStatus()
        {
            List<CategoryStatus> list = await this._categoryStatusService.ListCategoryStatus().ToListAsync();
            APIResponse response = new APIResponse()
            {
                Data = list.Select(CS => this._mapper.Map<CategoryStatus, GetCategoryStatusDTO>(CS))
            };
            return response;
        }
    }

}
