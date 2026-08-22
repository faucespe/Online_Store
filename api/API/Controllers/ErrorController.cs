using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace API.Controllers
{
    [Route("errors")]
    [ApiController]
    public class ErrorController : ControllerBase
    {
        [Route("{StatusCode}")]
        public ObjectResult HandleStatus(HttpStatusCode statusCode)
        {
            APIResponse response = new APIResponse()
            {
                statusCode = statusCode,
                Success = false
            };

            ObjectResult result = new ObjectResult(response);
            result.StatusCode = (int)statusCode;

            return result;
        }
    }
}