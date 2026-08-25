using API.Data.Models;

namespace API.DataTransferObjects
{
    public class GetPurchaseOrderProductDTO
    {
        public int Id { get; set; }
        public int IdProduct { get; set; }
        public int IdPurchaseOrder { get; set; }
        public int ProductQuantity { get; set; }
        public decimal Price { get; set; }
    }
}