using ProductManagementSystem.API.Common;
using ProductManagementSystem.API.DTOs.Product;

namespace ProductManagementSystem.API.Services.Interfaces
{
    public interface IProductService
    {
        Task<Result<List<ProductDTO>>> GetAllProducts(ProductFilterDTO filter);
        Task<Result<int>> CreateProduct(CreateProductDTO request);
    }
}
