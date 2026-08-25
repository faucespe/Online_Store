using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Net;

namespace API
{
	public static class HttpErrors
	{
        public static BadRequestObjectResult BadRequest(string? message = null, object? data = null)
        {
            return new BadRequestObjectResult(GetErrorApiResponse(HttpStatusCode.BadRequest, message, data));
        }
        public static NotFoundObjectResult NotFound(string? message = null, object? data = null)
        {
            return new NotFoundObjectResult(GetErrorApiResponse(HttpStatusCode.NotFound, message, data));
        }

        private static ApiResponse GetErrorApiResponse(HttpStatusCode statusCode, string? message, object? data)
        {
            ApiResponse response = new()
            {
                statusCode = statusCode,
                Success = false,
                Data = data,
            };

            if (!string.IsNullOrWhiteSpace(message))
            {
                response.Messages.Add(message);
            }

            return response;
        }
    };
}