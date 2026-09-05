namespace API.Data.Filters
{
    /// Filtro utilizado para obtener los productos asociados a una orden de compra específica.
    public class PurchaseOrderProductFilters
    {
        /// Obtiene o establece el identificador de la orden de compra
        /// que se utilizará para filtrar los productos asociados.
        public int PurchaseOrderId { get; set; }
    }
}
