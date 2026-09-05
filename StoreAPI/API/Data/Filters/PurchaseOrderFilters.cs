namespace API.Data.Filters
{
    public class PurchaseOrderFilters
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
