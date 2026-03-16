namespace ProductManagementSystem.API.Services.Interfaces
{
    public interface ICurrentUserContext
    {
        public int UserId { get; }
        public string Email { get; }
        public string Role { get; }
        public bool IsAdmin { get; }
    }
}
