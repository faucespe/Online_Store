using API.Data.Models;

namespace API.DataTransferObjects
{
    public class GetCategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public GetCategoryStatusDto CategoryStatus { get; set; } = null!;

    }
    public class CreateUpdateCategoryDto
    {
        public string? Name { get; set; } = null!;
        public int? CategoryStatusId { get; set; } = null!;
    }
    public class CategoryFiltersDto
    {
        public string? Name { get; set; }
        public int? CategoryStatusId { get; set; }
    }
}