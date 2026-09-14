using API.Data.Models;

namespace API.DataTransferObjects
{
    public class GetPurchaseOrderDto
    {
        public int Id { get; set; }
        public string CustomerName { get; set; } = null!;
        public string CustomerPhoneNumber { get; set; } = null!;
        public string CustomerEmail { get; set; } = null!;
        public string CustomerAddress { get; set; } = null!;
        public ICollection<GetPurchaseOrderProductDto> PurchaseOrderProduct { get; set; } = new List<GetPurchaseOrderProductDto>();
        public DateTime PurchaseDate { get; set; }
        public decimal GrandTotal { get; set;}
        
    }

    public class CreatePurchaseOrderDto
    {
        public string CustomerName { get; set; } = null!;
        public string CustomerPhoneNumber { get; set; } = null!;
        public string CustomerEmail { get; set; } = null!;
        public string CustomerAddress { get; set; } = null!;
        public List<CreatePurchaseOrderProductDto> PurchaseOrderProduct { get; set; } = new();
    }

    public class FilterPurchaseOrderDto
    {
        public int? Id { get; set; }
        public string? CustomerName { get; set; }
        public string? CustomerPhoneNumber { get; set; }
        public DateTime? PurchaseDateFrom { get; set; }
        public DateTime? PurchaseDateTo { get; set; }
        public decimal? GrandTotalFrom { get; set; }
        public decimal? GrandTotalTo { get; set; }
    }
}