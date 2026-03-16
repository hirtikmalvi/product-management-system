namespace ProductManagementSystem.API.DTOs.Product
{
    public class ProductFilterDTO
    {
        public string? Name { get; set; } = null;
        public int? CategoryId { get; set; } = null;
        public bool? InStock { get; set; } = null;
        public decimal? MinPrice { get; set; } = null;
        public decimal? MaxPrice { get; set; } = null;
        public DateTime? CreatedToDate { get; set; } = null;
        public DateTime? CreatedFromDate { get; set; } = null;
    }
}
