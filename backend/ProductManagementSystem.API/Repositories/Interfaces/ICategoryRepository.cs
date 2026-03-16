using ProductManagementSystem.API.Models;

namespace ProductManagementSystem.API.Repositories.Interfaces
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetCategories();
    }
}
