using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace API.Controllers
{
    [Route("errors")]
    [ApiController]
    public class ErrorController : ControllerBase
    {
        private IWebHostEnvironment _env;

        public ErrorController(IWebHostEnvironment env)
        {
            this._env = env;
        }

        [Route("{StatusCode}")]
        [HttpGet]
        public ObjectResult HandleStatus(HttpStatusCode statusCode)
        {
            ApiResponse response = new()
            {
                statusCode = statusCode,
                Success = false
            };

            switch (response.statusCode)
            {
                case HttpStatusCode.InternalServerError:
                    response.Messages.Add("An unexpected error occurred on the server.");

                    if (this._env.IsDevelopment())
                    {
                        Exception? ex = HttpContext.Features.Get<IExceptionHandlerPathFeature>()?.Error;
                        if (ex != null)
                        {
                            response.Data = new
                            {
                                ex.Message,
                                ex.StackTrace,
                                InnerExpection = ex.InnerException?.Message,
                                ex.Source,
                                ex.HResult
                            };
                        }
                    }
                    break;
            }

            ObjectResult result = new ObjectResult(response);
            result.StatusCode = (int)statusCode;

            return result;
        }
    }
}