using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Net;

namespace API
{
	public static class HttpErrors
	{
        public static NotFoundObjectResult NotFound(string? message = null, object? data = null)
        {
            return new NotFoundObjectResult(GetErrorAPIResponse(HttpStatusCode.NotFound, message, data));
        }

        private static APIResponse GetErrorAPIResponse(HttpStatusCode statusCode, string? message, object? data)
        {
            APIResponse response = new()
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

        public static APIResponse HandleModelState(ModelStateDictionary modelState)
        {
            APIResponse response = new()
            {
                statusCode = HttpStatusCode.BadRequest,
                Success = false,
                Data = null,
            };

            foreach (var modelStateItem in modelState)
            {
                foreach (var error in modelStateItem.Value!.Errors)
                {
                    string message = error.ErrorMessage;

                    string propertyName = modelStateItem.Key.Replace("$.", "");
                    propertyName = char.ToUpper(propertyName[0]) + propertyName.Substring(1);

                    if (message.Contains("could not be converted to System.Decimal"))
                    {
                        response.Messages.Add($"{propertyName} must be a valid decimal number.");
                    }
                    else if (message.Contains("could not be converted to System.Int32"))
                    {
                        response.Messages.Add( $"{propertyName} must be a valid integer.");
                    }
                    else
                    {
                        response.Messages.Add(message);
                    }
                }
            }
            return response;
        }

    };
}