using ProductManagementSystem.API.Common;
using ProductManagementSystem.API.DTOs.Auth.Register;
using ProductManagementSystem.API.Repositories.Interfaces;
using ProductManagementSystem.API.Services.Interfaces;

namespace ProductManagementSystem.API.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository authRepository;
        public AuthService(IAuthRepository _authRepository) 
        { 
            authRepository = _authRepository;
        }
        public async Task<Result<RegisterUserResponseDTO>> Register(RegisterUserRequestDTO request)
        {
            if (await authRepository.EmailExists(request.Email))
            {
                return Result<RegisterUserResponseDTO>.Fail(409);
            }
            try
            {
                await authRepository.Register(request);

                return Result<RegisterUserResponseDTO>.Ok(new RegisterUserResponseDTO
                {
                    Name = request.Name,
                    Email = request.Email,
                    Role = request.Role
                }, 201);
            }
            catch (Exception ex)
            {
                return Result<RegisterUserResponseDTO>.Fail(500);
            }

        }
    }
}
