using System.ComponentModel.DataAnnotations;

namespace ProductManagementSystem.API.DTOs.Auth.Register
{
    public class RegisterUserRequestDTO
    {
        [Required]
        [MaxLength(150)]
        public string Name { get; set; }
        [Required]
        [EmailAddress]
        [MaxLength(320)]
        public string Email { get; set; }
        [Required]
        [MaxLength(255)]
        public string Password { get; set; }
        [Required]
        [AllowedValues("Admin", "User")]
        [MaxLength(15)]
        public string Role { get; set; }
    }
}
