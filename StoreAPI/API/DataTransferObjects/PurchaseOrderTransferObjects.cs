using API.Data.Models;

namespace API.DataTransferObjects
{
    public class GetPurchaseOrderDTO
    {
        public int Id { get; set; }
        public string CustomerName { get; set; } = null!;
        public string CustomerPhoneNumber { get; set; } = null!;
        public string CustomerEmail { get; set; } = null!;
        public string CustomerAddress { get; set; } = null!;
        public ICollection<GetPurchaseOrderProductDTO> PurchaseOrderProduct { get; set; } = new List<GetPurchaseOrderProductDTO>();
        public DateTime PurchaseDate { get; set; }
        public decimal GrandTotal { get; set;}
        
    }

    public class CreateUpdatePurchaseOrderDTO
    {
        public string CustomerName { get; set; } = null!;
        public string CustomerPhoneNumber { get; set; } = null!;
        public string CustomerEmail { get; set; } = null!;
        public string CustomerAddress { get; set; } = null!;
        public List<CartProduct> CartProducts { get; set; } = new();
    }

    public class FilterPurchaseOrderDTO
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