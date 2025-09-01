namespace UrbanSync.Server.DTO {
    public record UserRegisterDto(
        string username,
        string password,
        string email,
        DateTime DateOfRegistrstion
        ):BaseUserDto(username, password); 
    }
