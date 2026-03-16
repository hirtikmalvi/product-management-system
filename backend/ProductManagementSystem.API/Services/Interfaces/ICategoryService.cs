using ProductManagementSystem.API.Common;
using ProductManagementSystem.API.Models;

namespace ProductManagementSystem.API.Services.Interfaces
{
    public interface ICategoryService
    {
        Task<Result<List<Category>>> GetCategories();
    }
}
