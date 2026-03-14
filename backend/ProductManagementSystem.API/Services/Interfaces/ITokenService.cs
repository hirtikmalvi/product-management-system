using ProductManagementSystem.API.Models;

namespace ProductManagementSystem.API.Services.Interfaces
{
    public interface ITokenService
    {
        string GenerateJwtToken(User user);
    }
}
