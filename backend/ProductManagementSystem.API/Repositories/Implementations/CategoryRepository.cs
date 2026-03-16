using Npgsql;
using ProductManagementSystem.API.Models;
using ProductManagementSystem.API.Repositories.Interfaces;

namespace ProductManagementSystem.API.Repositories.Implementations
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly IConfiguration configuration;
        private readonly string connectionString;

        public CategoryRepository(IConfiguration _configuration)
        {
            configuration = _configuration;
            connectionString = configuration.GetConnectionString("DbConnectionString")!;
        }

        public async Task<List<Category>> GetCategories()
        {
            var categories = new List<Category>();

            await using var conn = new NpgsqlConnection(connectionString);

            await conn.OpenAsync();

            var sql = "SELECT * FROM Categories";

            await using var cmd = new NpgsqlCommand(sql, conn);

            var reader = await cmd.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                categories.Add(new Category
                {
                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                    Name = reader.GetString(reader.GetOrdinal("Name")),
                });
            }
            return categories;
        }

        public async Task<bool> CategoryExists(int categoryId)
        {
            await using var conn = new NpgsqlConnection(connectionString);

            await conn.OpenAsync();

            var sql = "SELECT EXISTS (SELECT 1 FROM Categories WHERE id = @c_id);";

            await using var cmd = new NpgsqlCommand(sql, conn);

            cmd.Parameters.AddWithValue("@c_id", categoryId);

            var categoryExists = (bool)(await cmd.ExecuteScalarAsync())!;
            return categoryExists;
        }

    }
}
