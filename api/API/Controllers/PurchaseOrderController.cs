using API.Data.Models;
using API.DataTransferObjects;
using API.Services;
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

        public PurchaseOrderController(IMapper mapper,      IPurchaseOrderService purchaseOrderService)
        {
            this._mapper = mapper;
            this._purchaseOrderService = purchaseOrderService;
        }
        [HttpGet]
        public async Task<ActionResult<APIResponse>> ListPurchaseOrders()
        {
            List<PurchaseOrder> list = await this._purchaseOrderService.ListPurchaseOrders().ToListAsync();

            APIResponse response = new APIResponse()
            {
                Data = list.Select(PO => this._mapper.Map<PurchaseOrder, GetPurchaseOrderDTO>(PO))
            };
            return response;
        }
    }
}