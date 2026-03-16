using ProductManagementSystem.API.Common;
using ProductManagementSystem.API.Models;
using ProductManagementSystem.API.Repositories.Interfaces;
using ProductManagementSystem.API.Services.Interfaces;

namespace ProductManagementSystem.API.Services.Implementations
{
    public class CategoryService: ICategoryService
    {
        private readonly ICategoryRepository categoryRepository;
        public CategoryService(ICategoryRepository _categoryRepository)
        {
            categoryRepository = _categoryRepository;
        }

        public async Task<Result<List<Category>>> GetCategories()
        {
            var categories = await categoryRepository.GetCategories();
            var responseToSend = Result<List<Category>>.Ok(categories, 200);
            return responseToSend;
        }
    }
}
