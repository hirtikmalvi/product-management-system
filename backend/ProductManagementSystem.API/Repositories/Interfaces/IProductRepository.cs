using ProductManagementSystem.API.DTOs.Product;

namespace ProductManagementSystem.API.Repositories.Interfaces
{
    public interface IProductRepository
    {
        Task<List<ProductDTO>> GetAllProducts(ProductFilterDTO filter);
        Task<int> CreateProduct(CreateProductDTO request);
        Task<ProductDTO> GetProductById(int productId);
        Task UpdateProduct(int productId, UpdateProductDTO request);
        Task DeleteProduct(int productId);
        Task<bool> ProductExists (int productId);
    }
}
