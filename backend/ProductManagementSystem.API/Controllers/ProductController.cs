using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        [HttpPost]
        public async Task<IActionResult> GetAllProducts([FromBody] ProductFilterDTO filter)
        {
            var result = await productService.GetAllProducts(filter);
            return Ok(result);
        }
    }
}
