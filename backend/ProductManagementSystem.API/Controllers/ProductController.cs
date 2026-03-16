using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductManagementSystem.API.Common;
using ProductManagementSystem.API.DTOs.Product;
using ProductManagementSystem.API.Services.Interfaces;
using System.Threading.Tasks;

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

        [HttpPost("all-products")]
        public async Task<IActionResult> GetAllProducts([FromBody] ProductFilterDTO filter)
        {
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
    }
}
