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
    [Route("api/purchase-orders")]
    [ApiController]
    public class PurchaseOrderController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IPurchaseOrderService _purchaseOrderService;
        private readonly IPurchaseOrderValidator _purchaseOrderValidator;

        public PurchaseOrderController(IMapper mapper, IPurchaseOrderService purchaseOrderService, IPurchaseOrderValidator purchaseOrderValidator)
        {
            this._mapper = mapper;
            this._purchaseOrderService = purchaseOrderService;
            this._purchaseOrderValidator = purchaseOrderValidator;
        }
        [HttpGet]
        public async Task<ActionResult<ApiResponse>> ListPurchaseOrders([FromQuery] FilterPurchaseOrderDTO data)
        {
            PurchaseOrderFilters filter = this._mapper.Map<FilterPurchaseOrderDTO, PurchaseOrderFilters>(data);
            List<PurchaseOrder> list = await this._purchaseOrderService.ListPurchaseOrders(filter)
                .OrderBy(p => p.Id)
                .ToListAsync();

            ApiResponse response = new()
            {
                Data = list.Select(p => this._mapper.Map<PurchaseOrder, GetPurchaseOrderDTO>(p))
            };

            return response;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse>> FindPurchaseOrder(int id)
        {
            PurchaseOrder? purchaseOrder = await this._purchaseOrderService.FindPurchaseOrder(id);
            if (purchaseOrder == null)
            {
                return HttpErrors.NotFound("Purchase order does not exist in the system");
            }
            ApiResponse response = new ApiResponse()
            {
                Data = this._mapper.Map<PurchaseOrder, GetPurchaseOrderDTO>(purchaseOrder)
            };
            return response;
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse>> InsertPurchaseOrder(CreateUpdatePurchaseOrderDTO data)
        {
            ApiResponse response = new ApiResponse();
            response.Success = await this._purchaseOrderValidator.ValidateCreateUpdatePurchaseOrder(null, data, response.Messages);

            if (response.Success)
            {
                PurchaseOrderCustom purchaseOrderCustom = this._mapper.Map<CreateUpdatePurchaseOrderDTO, PurchaseOrderCustom>(data);
                PurchaseOrder purchaseOrder = await this._purchaseOrderService.InsertPurchaseOrder(purchaseOrderCustom);

                response.Data = this._mapper.Map<PurchaseOrder, GetPurchaseOrderDTO>(purchaseOrder);
                response.Messages.Add("PurchaseOrder has been inserted");
            }

            return response;
        }
    }
}