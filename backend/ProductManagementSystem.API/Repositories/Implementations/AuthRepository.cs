using Microsoft.AspNetCore.Identity;
using Npgsql;
using ProductManagementSystem.API.Common;
using ProductManagementSystem.API.DTOs.Auth.Register;
using ProductManagementSystem.API.Models;
using ProductManagementSystem.API.Repositories.Interfaces;

namespace ProductManagementSystem.API.Repositories.Implementations
{
    public class AuthRepository: IAuthRepository
    {
        private readonly IConfiguration configuration;
        private readonly string connectionString;
        public AuthRepository(IConfiguration _configuration) 
        { 
            configuration = _configuration;
            connectionString = configuration.GetConnectionString("DbConnectionString")!;
        }

        public async Task<int> Register(RegisterUserRequestDTO request)
        {

            var hashedPassword = new PasswordHasher<User>().HashPassword(null, request.Password);

            await using var conn = new NpgsqlConnection(connectionString);
            await conn.OpenAsync();

            await using var cmd = new NpgsqlCommand(
                "CALL registerUser(@Name, @Email, @PasswordHash, @Role)", conn);

            cmd.Parameters.AddWithValue("Name", request.Name);
            cmd.Parameters.AddWithValue("Email", request.Email);
            cmd.Parameters.AddWithValue("PasswordHash", hashedPassword);
            cmd.Parameters.AddWithValue("Role", request.Role);

            return await cmd.ExecuteNonQueryAsync();
        }

        public async Task<bool> EmailExists(string email)
        {
            await using var conn = new NpgsqlConnection(connectionString);
            await conn.OpenAsync();

            string sql = "SELECT EXISTS (SELECT 1 FROM Users WHERE Email = @email)";
            await using var cmd = new NpgsqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("email", email);
            var result = await cmd.ExecuteScalarAsync();
            bool exists = result != null && (bool) result;
            return exists;
        }

        public async Task<User> GetUserByEmail(string email)
        {
            User user = null;

            await using var conn = new NpgsqlConnection(connectionString);
            await conn.OpenAsync();

            string sql = "SELECT * FROM Users WHERE Email = @email";
            await using var cmd = new NpgsqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("email", email);
            
            await using var reader = await cmd.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                user = new User
                {
                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                    Name = reader.GetString(reader.GetOrdinal("Name")),
                    Email = reader.GetString(reader.GetOrdinal("Email")),
                    PasswordHash = reader.GetString(reader.GetOrdinal("PasswordHash")),
                    Role = reader.GetString(reader.GetOrdinal("Role"))
                };
            }
            
            return user;
        }
    }
}






