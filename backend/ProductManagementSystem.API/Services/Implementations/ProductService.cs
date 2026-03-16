using ProductManagementSystem.API.Common;
using ProductManagementSystem.API.DTOs.Product;
using ProductManagementSystem.API.Repositories.Interfaces;
using ProductManagementSystem.API.Services.Interfaces;

namespace ProductManagementSystem.API.Services.Implementations
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository productRepository;

        public ProductService(IProductRepository _productRepository)
        {
            productRepository = _productRepository;
        }
        public async Task<Result<List<ProductDTO>>> GetAllProducts(ProductFilterDTO filter)
        {
            var result = await productRepository.GetAllProducts(filter);

            return Result<List<ProductDTO>>.Ok(result, 200);
        }
    }
}
