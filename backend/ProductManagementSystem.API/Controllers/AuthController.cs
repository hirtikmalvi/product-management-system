using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductManagementSystem.API.Common;
using ProductManagementSystem.API.DTOs.Auth.Register;
using ProductManagementSystem.API.Services.Interfaces;
using System.Threading.Tasks;

namespace ProductManagementSystem.API.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService authService;

        public AuthController(IAuthService _authService)
        {
            authService = _authService;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserRequestDTO request)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Where(ms => ms.Value.Errors.Count > 0).SelectMany(kvp => kvp.Value.Errors.Select(err => err.ErrorMessage)).ToList();

                return Ok(Result<RegisterUserResponseDTO>.Fail(400, errors));
            }
            var result = await authService.Register(request);
            return Ok(result);
        }

    }
}
