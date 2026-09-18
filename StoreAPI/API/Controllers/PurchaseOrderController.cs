using API.Data.Filters;
using API.Data.Models;
using API.DataTransferObjects;
using API.Services;
using API.Validators;
using AutoMapper;
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
        public async Task<ActionResult<ApiResponse>> ListPurchaseOrders([FromQuery] FilterPurchaseOrderDto data)
        {
            PurchaseOrderFilters filter = this._mapper.Map<FilterPurchaseOrderDto, PurchaseOrderFilters>(data);
            List<PurchaseOrder> list = await this._purchaseOrderService.ListPurchaseOrders(filter)
                .OrderBy(p => p.Id)
                .ToListAsync();

            ApiResponse response = new()
            {
                Data = list.Select(p => this._mapper.Map<PurchaseOrder, GetPurchaseOrderDto>(p))
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
            ApiResponse response = new()
            {
                Data = this._mapper.Map<PurchaseOrder, GetPurchaseOrderDto>(purchaseOrder)
            };
            return response;
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse>> InsertPurchaseOrder(CreatePurchaseOrderDto data)
        {
            ApiResponse response = new();
            response.Success = await this._purchaseOrderValidator.ValidateCreateUpdatePurchaseOrder(null, data, response.Messages);

            if (response.Success)
            {
                PurchaseOrder purchaseOrder = this._mapper.Map<CreatePurchaseOrderDto, PurchaseOrder>(data);
                await this._purchaseOrderService.InsertPurchaseOrder(purchaseOrder);

                response.Data = this._mapper.Map<PurchaseOrder, GetPurchaseOrderDto>(purchaseOrder);
                response.Messages.Add("PurchaseOrder has been inserted");
            }

            return response;
        }
    }
}