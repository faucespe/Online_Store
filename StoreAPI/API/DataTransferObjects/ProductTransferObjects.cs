using API.Data.Models;

namespace API.DataTransferObjects
{
    public class GetProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string? ImageUrl { get; set; }
        public decimal Price { get; set; }
        public GetCategoryDto? Category { get; set; }
        public GetProductStatusDto ProductStatus { get; set; } = null!;
        public int Stock { get; set; }
    }

    public class InsertUpdateProductDto
    {
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string? ImageUrl { get; set; }
        public decimal Price { get; set; }
        public int? CategoryId { get; set; }
        public int ProductStatusId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int Stock { get; set; }
    }

    public class FilterProductDto
    {
        public string? Name { get; set; }
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }
        public int? CategoryId { get; set; }
        public int? ProductStatusId { get; set; }
    }
}