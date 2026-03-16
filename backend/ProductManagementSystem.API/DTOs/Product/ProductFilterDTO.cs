namespace ProductManagementSystem.API.DTOs.Product
{
    public class ProductFilterDTO
    {
        public string? Name { get; set; }
        public int? CategoryId { get; set; }
        public bool? InStock { get; set; }
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }
        public DateTime? CreatedToDate { get; set; }
        public DateTime? CreatedFromDate { get; set; }
    }
}
