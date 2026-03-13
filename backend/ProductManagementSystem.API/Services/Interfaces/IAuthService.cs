using ProductManagementSystem.API.Common;
using ProductManagementSystem.API.DTOs.Auth.Register;

namespace ProductManagementSystem.API.Services.Interfaces
{
    public interface IAuthService
    {
        // Register
        Task<Result<RegisterUserResponseDTO>> Register(RegisterUserRequestDTO request);
    }
}
