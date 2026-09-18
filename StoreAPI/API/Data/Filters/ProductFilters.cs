namespace API.Data.Filters
{
    public class ProductFilters
    {
        public string? Name { get; set; }
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }
        public int? CategoryId { get; set; }
        public int? ProductStatusId { get; set; }
    }
}
