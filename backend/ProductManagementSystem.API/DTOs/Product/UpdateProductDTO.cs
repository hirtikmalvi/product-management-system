using System.ComponentModel.DataAnnotations;

namespace ProductManagementSystem.API.DTOs.Product
{
    public class UpdateProductDTO
    {
        [Required (ErrorMessage = "ProductId is required.")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Product Name is required.")]
        [MinLength(1, ErrorMessage = "Length of Product Name should be 0-200 characters.")]
        [MaxLength(200, ErrorMessage = "Length of Product Name should be 0-200 characters.")]
        public string Name { get; set; }
        public string? Description { get; set; }

        [Required]
        [Range(0, (double)decimal.MaxValue, ErrorMessage = "The field Price must be atleast 0.")]
        public decimal Price { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "The field CategoryId must be atleast 1.")]
        public int? CategoryId { get; set; }

        [Required]
        public bool InStock { get; set; }

        [Required]
        public DateTime ManufactureDate { get; set; }
    }
}
