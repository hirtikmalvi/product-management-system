using ProductManagementSystem.API.DTOs.Auth.Register;

namespace ProductManagementSystem.API.Repositories.Interfaces
{
    public interface IAuthRepository
    {
        public Task<int> Register(RegisterUserRequestDTO request);
        public Task<bool> EmailExists(string email);
    }
}
