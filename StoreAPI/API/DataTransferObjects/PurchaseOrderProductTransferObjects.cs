using API.Data.Models;

namespace API.DataTransferObjects
{
    public class GetPurchaseOrderProductDto
    {
        public int Id { get; set; }

        public int ProductId { get; set; }

        public GetProductDto? Product { get; set; }

        public int PurchaseOrderId { get; set; }

        public int ProductQuantity { get; set; }

        public decimal Price { get; set; }
    }

    /// DTO utilizado para filtrar los productos asociados a una orden de compra.
    public class FilterPurchaseOrderProductDto
    {
        /// Identificador de la orden de compra.
        public int PurchaseOrderId { get; set; }
    }

    public class CreatePurchaseOrderProductDto
    {
        public int ProductId { get; set; }
        public int ProductQuantity { get; set; }
    }
}