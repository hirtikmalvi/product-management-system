using Microsoft.AspNetCore.Identity;
using ProductManagementSystem.API.Common;
using ProductManagementSystem.API.DTOs.Auth.Login;
using ProductManagementSystem.API.DTOs.Auth.Register;
using ProductManagementSystem.API.Models;
using ProductManagementSystem.API.Repositories.Interfaces;
using ProductManagementSystem.API.Services.Interfaces;

namespace ProductManagementSystem.API.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository authRepository;
        private readonly ITokenService tokenService;

        public AuthService(IAuthRepository _authRepository, ITokenService _tokenService) 
        { 
            authRepository = _authRepository;
            tokenService = _tokenService;
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
                Console.WriteLine(ex.ToString());
                return Result<RegisterUserResponseDTO>.Fail(500);
            }
        }
        public async Task<Result<LoginUserResponseDTO>> Login(LoginUserRequestDTO request)
        {
            var user = await authRepository.GetUserByEmail(request.Email);

            if(user == null)
            {
                return Result<LoginUserResponseDTO>.Fail(401);
            }
            if (new PasswordHasher<User>().VerifyHashedPassword(user, user.PasswordHash, request.Password) == PasswordVerificationResult.Failed)
            {
                return Result<LoginUserResponseDTO>.Fail(401);
            }

            var token = tokenService.GenerateJwtToken(user);
            return Result<LoginUserResponseDTO>.Ok(new LoginUserResponseDTO
            {
                Token = token, 
            }, 200);
        }

    }
}