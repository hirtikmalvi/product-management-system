using ProductManagementSystem.API.Services.Interfaces;
using System.Security.Claims;

namespace ProductManagementSystem.API.Services.Implementations
{
    public class CurrentUserContext : ICurrentUserContext
    {
        private readonly IHttpContextAccessor httpContextAccessor;

        public CurrentUserContext(IHttpContextAccessor _httpContextAccessor)
        {
            httpContextAccessor = _httpContextAccessor;
        }

        public int UserId => Convert.ToInt32(httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

        public string Email => httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.Email)?.Value ?? string.Empty;

        public string Role => httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.Role)?.Value ?? string.Empty;

        public bool IsAdmin => Role == "Admin";
    }
}
