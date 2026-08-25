namespace API.DataTransferObjects
{
    public class GetCategoryStatusDTO
    {
        public int Id { get; set; }
        public string Status { get; set; } = null!;
    }
}