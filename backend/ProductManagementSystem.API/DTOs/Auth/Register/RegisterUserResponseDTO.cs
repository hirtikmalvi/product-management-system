using System.ComponentModel.DataAnnotations;

namespace ProductManagementSystem.API.DTOs.Auth.Register
{
    public class RegisterUserResponseDTO
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
    }
}
