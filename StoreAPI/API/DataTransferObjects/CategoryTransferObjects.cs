using API.Data.Models;

namespace API.DataTransferObjects
{
    public class GetCategoryDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public GetCategoryStatusDTO Status { get; set; } = null!;

    }
    public class CreateUpdateCategoryDTO
    {
        public string? Name { get; set; } = null!;
        public int? IdStatus { get; set; } = null!;
    }
    public class CategoryFiltersDTO
    {
        public string? Name { get; set; }
        public int? IdStatus { get; set; }
    }
}