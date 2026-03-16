using ProductManagementSystem.API.Common;
using System.Text.Json;

namespace ProductManagementSystem.API.Middleware
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
        {
            _logger = logger;
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled exception occurred.");

                var errors = new List<string>
                {
                    ex.Message
                };
                if (ex.InnerException != null)
                {
                    errors.Add($"Inner Exeption: {ex.InnerException.Message}");
                }

                var result = Result<string>.Fail(500, errors);

                context.Response.ContentType = "application/json";
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;

                var jsonResponse = JsonSerializer.Serialize(result, new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                });
                await context.Response.WriteAsync(jsonResponse);
            }
        }
    }
}
