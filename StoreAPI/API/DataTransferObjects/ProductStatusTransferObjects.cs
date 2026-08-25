namespace API.DataTransferObjects
{
    public class GetProductStatusDTO
    {
        public int Id { get; set; }
        public string Status { get; set; } = null!;
    }
}
