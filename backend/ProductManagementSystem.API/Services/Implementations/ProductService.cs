using ProductManagementSystem.API.Common;
using ProductManagementSystem.API.DTOs.Product;
using ProductManagementSystem.API.Models;
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

        public async Task<Result<int>> CreateProduct(CreateProductDTO request)
        {
            var result = await productRepository.CreateProduct(request);

            return Result<int>.Ok(result, 200);
        }

        public async Task<Result<ProductDTO>> GetProductById(int productId)
        {
            var product = await productRepository.GetProductById(productId);

            if (product == null)
            {
                return Result<ProductDTO>.Fail(404, [$"Product with productId: {productId} not found."]);
            }

            return Result<ProductDTO>.Ok(product, 200);
        }

        public async Task<Result<int>> UpdateProduct(int productId, UpdateProductDTO request)
        {
            if (!(await productRepository.ProductExists(productId)))
            {
                return Result<int>.Fail(404, [$"Product with productId: {productId} not found."]);
            }
            await productRepository.UpdateProduct(productId, request);
            return Result<int>.Ok(request.Id, 200);
        }

        public async Task<Result<int>> DeleteProduct(int productId)
        {
            if (!(await productRepository.ProductExists(productId)))
            {
                return Result<int>.Fail(404, [$"Product with productId: {productId} not found."]);
            }
            await productRepository.DeleteProduct(productId);
            return Result<int>.Ok(productId, 200);
        }
    }
}
