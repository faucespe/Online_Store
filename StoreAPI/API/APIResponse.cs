using System.Net;

namespace API
{
    public class ApiResponse
    {
        public HttpStatusCode statusCode { get; set; }
        public bool Success { get; set; }
        public List<string> Messages { get; set; }
        public object? Data { get; set; }

        public ApiResponse()
        {
            this.statusCode = HttpStatusCode.OK;
            this.Success = true;
            this.Messages = new List<string>();
        }
    }
}