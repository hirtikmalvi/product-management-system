using ProductManagementSystem.API.DTOs.Auth.Register;
using ProductManagementSystem.API.Models;

namespace ProductManagementSystem.API.Repositories.Interfaces
{
    public interface IAuthRepository
    {
        public Task<int> Register(RegisterUserRequestDTO request);
        public Task<User> GetUserByEmail(string email);   
        public Task<bool> EmailExists(string email);
    }
}
