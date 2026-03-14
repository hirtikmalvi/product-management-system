using System.ComponentModel.DataAnnotations;

namespace ProductManagementSystem.API.DTOs.Auth.Login
{
    public class LoginUserRequestDTO
    {
        [Required]
        [EmailAddress]
        [MaxLength(320)]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
