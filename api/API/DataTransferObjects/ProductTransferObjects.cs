using API.Data.Models;

namespace API.DataTransferObjects
{
    public class GetProductDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string? ImageUrl { get; set; }
        public decimal Price { get; set; }
        public int IdCategory { get; set; }
        public int IdStatus { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int Stock { get; set; }
    }

    public class InsertUpdateProductDTO
    {
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string? ImageUrl { get; set; }
        public decimal Price { get; set; }
        public int IdCategory { get; set; }
        public int IdStatus { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int Stock { get; set; }
    }
}