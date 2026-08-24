namespace API.Data.Filters
{
    public class ProductFilters
    {
        public string? Name { get; set; }
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }
        public int? IdCategory { get; set; }
        public int? IdStatus { get; set; }
    }
}
