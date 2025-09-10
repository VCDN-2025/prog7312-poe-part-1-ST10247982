namespace UrbanSync.Server.DTO {
    public record UserRegisterDto(
        string Username,
        string Password,
        string Email,
        string Name
        ):BaseUserDto(Username, Password); 
    }
