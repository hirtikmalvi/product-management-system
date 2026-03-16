using Npgsql;
using ProductManagementSystem.API.DTOs.Product;
using ProductManagementSystem.API.Models;
using ProductManagementSystem.API.Repositories.Interfaces;

namespace ProductManagementSystem.API.Repositories.Implementations
{
    public class ProductRepository : IProductRepository
    {
        private readonly IConfiguration configuration;
        private readonly string connectionString;

        public ProductRepository(IConfiguration _configuration)
        {
            configuration = _configuration;
            connectionString = configuration.GetConnectionString("DbConnectionString")!;
        }

        public async Task<List<ProductDTO>> GetAllProducts(ProductFilterDTO filter)
        {
            var products = new List<ProductDTO>();

            await using var conn = new NpgsqlConnection(connectionString);

            await conn.OpenAsync();

            var sql = "SELECT * FROM get_products(@p_name, @p_category_id, @p_in_stock, @p_min_price, @p_max_price, @p_created_from_date, @p_created_to_date)";

            await using var cmd = new NpgsqlCommand(sql, conn);

            cmd.Parameters.AddWithValue("@p_name", (object?)filter.Name ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@p_category_id", (object?)filter.CategoryId ?? DBNull.Value); 
            cmd.Parameters.AddWithValue("@p_in_stock", (object?)filter.InStock ?? DBNull.Value); 
            cmd.Parameters.AddWithValue("@p_min_price", (object?)filter.MinPrice ?? DBNull.Value); 
            cmd.Parameters.AddWithValue("@p_max_price", (object?)filter.MaxPrice ?? DBNull.Value); 
            cmd.Parameters.Add("p_created_from_date", NpgsqlTypes.NpgsqlDbType.Date).Value = (object?)filter.CreatedFromDate ?? DBNull.Value;
            cmd.Parameters.Add("p_created_to_date", NpgsqlTypes.NpgsqlDbType.Date).Value = (object?)filter.CreatedToDate ?? DBNull.Value;
            await using var reader = await cmd.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                products.Add(ProductMapper(reader));
            }

            return products;
        }

        public async Task<int> CreateProduct(CreateProductDTO request)
        {
            await using var conn = new NpgsqlConnection(connectionString);

            await conn.OpenAsync();

            var sql = "SELECT create_product(@p_name, @p_description, @p_price, @p_category_id, @p_in_stock, @p_manufacture_date)";

            await using var cmd = new NpgsqlCommand(sql, conn);

            cmd.Parameters.AddWithValue("@p_name", (object?)request.Name!);
            cmd.Parameters.AddWithValue("@p_description", (object?)request.Description ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@p_price", (object?)request.Price!);
            cmd.Parameters.AddWithValue("@p_category_id", (object?)request.CategoryId ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@p_in_stock", (object?)request.InStock!);
            cmd.Parameters.Add("@p_manufacture_date", NpgsqlTypes.NpgsqlDbType.Date).Value = (object?)request.ManufactureDate;

            var addedProductId = await cmd.ExecuteScalarAsync();
            var productIdToReturn = (int)addedProductId!;

            return productIdToReturn;
        }

        private static ProductDTO ProductMapper(NpgsqlDataReader r)
        {
            return new ProductDTO()
            {
                Id = r.GetInt32(r.GetOrdinal("Id")),
                Name = r.GetString(r.GetOrdinal("Name")),
                Description = r.IsDBNull(r.GetOrdinal("Description")) ? "N/A" : r.GetString(r.GetOrdinal("Description")),
                Price = r.GetDecimal(r.GetOrdinal("Price")),
                InStock = r.GetBoolean(r.GetOrdinal("InStock")),
                CategoryId = r.GetInt32(r.GetOrdinal("CategoryId")),
                CategoryName = r.GetString(r.GetOrdinal("CategoryName")),
                CreatedAt = r.GetDateTime(r.GetOrdinal("CreatedAt")),
                ManufactureDate = r.GetDateTime(r.GetOrdinal("ManufactureDate")),
            };
        }
    }
}
