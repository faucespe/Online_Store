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
        public DateTime PurchaseDate { get; set; }
        public decimal GrandTotal { get; set;}
    }
}