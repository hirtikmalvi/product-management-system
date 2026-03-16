using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductManagementSystem.API.Common;
using ProductManagementSystem.API.DTOs.Product;
using ProductManagementSystem.API.Models;
using ProductManagementSystem.API.Services.Interfaces;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ProductManagementSystem.API.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService productService;
        public ProductController(IProductService _productService) 
        { 
            productService = _productService;
        }

        [HttpPost("get-all-products")]
        public async Task<IActionResult> GetAllProducts([FromBody] ProductFilterDTO filter)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Where(ms => ms.Value.Errors.Count > 0)
                                       .SelectMany(kvp => kvp.Value.Errors.
                                                Select(e => e.ErrorMessage))
                                       .ToList();
                return Ok(Result<int>.Fail(400, errors));
            }

            var result = await productService.GetAllProducts(filter);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody] CreateProductDTO request)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Where(ms => ms.Value.Errors.Count > 0)
                                       .SelectMany(kvp => kvp.Value.Errors.
                                                Select(e => e.ErrorMessage))
                                       .ToList();
                return Ok(Result<int>.Fail(400, errors));
            }
            var result = await productService.CreateProduct(request);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById([FromRoute] int id)
        {
            if (id <= 0)
            {
                return Ok(Result<ProductDTO>.Fail(400, ["Please enter valid productId."]));
            }

            var result = await productService.GetProductById(id);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct([FromRoute] int id, [FromBody] UpdateProductDTO request)
        {
            if (id != request.Id || id <= 0)
            {
                return Ok(Result<int>.Fail(400, [$"productId mismatch Or Invalid productId."]));
            }

            if (!ModelState.IsValid)
            {
                var errors = ModelState.Where(ms => ms.Value.Errors.Count > 0)
                                       .SelectMany(kvp => kvp.Value.Errors.
                                                Select(e => e.ErrorMessage))
                                       .ToList();
                return Ok(Result<int>.Fail(400, errors));
            }

            var result = await productService.UpdateProduct(id, request);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] int id)
        {
            if (id <= 0)
            {
                return Ok(Result<int>.Fail(400, [$"Invalid productId."]));
            }
            var result = await productService.DeleteProduct(id);
            return Ok(result);
        }

    }
}
