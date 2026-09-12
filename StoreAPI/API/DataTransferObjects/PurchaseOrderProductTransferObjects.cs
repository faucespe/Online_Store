using API.Data.Models;

namespace API.DataTransferObjects
{
    public class GetPurchaseOrderProductDTO
    {
        public int Id { get; set; }

        public int ProductId { get; set; }

        public GetProductDTO? Product { get; set; }

        public int PurchaseOrderId { get; set; }

        public int ProductQuantity { get; set; }

        public decimal Price { get; set; }
    }

    /// DTO utilizado para filtrar los productos asociados a una orden de compra.
    public class FilterPurchaseOrderProductDTO
    {
        /// Identificador de la orden de compra.
        public int PurchaseOrderId { get; set; }
    }
}