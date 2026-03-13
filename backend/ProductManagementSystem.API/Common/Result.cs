namespace ProductManagementSystem.API.Common
{
    public class Result<T>
    {
        public bool Success { get; set; }
        public int StatusCode { get; set; }
        public T? Data { get; set; }
        public List<string>? Errors { get; set; }

        public static Result<T> Ok(T data, int statusCode)
        {
            return new Result<T>
            {
                Success = true,
                StatusCode = statusCode,
                Data = data
            };
        }

        public static Result<T> Fail(int statusCode, string[] errors)
        {
            return new Result<T>
            {
                Success = false,
                StatusCode = statusCode,
                Errors = errors.ToList()
            };
        }
    }
}