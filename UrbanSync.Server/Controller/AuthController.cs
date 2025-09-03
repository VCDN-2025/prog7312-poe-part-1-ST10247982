using Microsoft.EntityFrameworkCore;
using UrbanSync.Server.Data;
using UrbanSync.Server.Models;
namespace UrbanSync.Server.Controller {
    using BCrypt.Net;
    using FluentValidation;
    using FluentValidation.Results;
    using Microsoft.AspNetCore.DataProtection;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using System.ComponentModel.DataAnnotations;
    using UrbanSync.Server.DTO;
    using UrbanSync.Server.Services;
    using ValidationResult = FluentValidation.Results.ValidationResult;

    public static class AuthController {
        public static async Task<IResult> LoginUser(HttpContext httpContext, [FromBody] BaseUserDto userDto, [FromServices] UrbanSyncDb context, [FromServices] TokenProvider tokenProvider) {

            if (string.IsNullOrEmpty(userDto.Username)) { throw new ArgumentNullException("email"); }
            if (string.IsNullOrEmpty(userDto.Password)) { throw new ArgumentNullException("password"); }


            User? foundUser = await context.Users.Where(u => u.Username == userDto.Username)
                .AsNoTracking()
                .FirstOrDefaultAsync<User>() ?? throw new KeyNotFoundException(userDto.Username);
            bool validPassword = BCrypt.Verify(userDto.Password, foundUser.PasswordHash);
            if (!validPassword) throw new UnauthorizedAccessException();

            string token = tokenProvider.Create(foundUser);

            httpContext.Response.Cookies.Append("Token", token, new CookieOptions {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTimeOffset.UtcNow.AddDays(14)
            }); ;
            return TypedResults.Ok(new {Message = "Logged in successfully!"});

        }

        public static async Task<IResult> RegisterUser([FromBody] UserRegisterDto registerDto, [FromServices] UrbanSyncDb db, [FromServices] IValidator<User> validator, [FromServices] ILogger<User> logger) {
            // we can add a custom validator tomorrow

            User user = new User {
                Username = registerDto.Username,
                DateOfRegistrstion = registerDto.DateOfRegistrstion,
                Email = registerDto.Email,
                Name = registerDto.Name,
                PasswordHash = registerDto.Password,
                Id = Guid.NewGuid(),
            };

            await validator.ValidateAndThrowAsync(user);


            User? foundUser = await db.Users.Where(u => u.Username == registerDto.Username).FirstOrDefaultAsync<User>();
            if (foundUser != null) {
                return TypedResults.Conflict(new {
                    Message = "Username already exists"
                });
            }
            user.PasswordHash = BCrypt.HashPassword(registerDto.Password);
            await db.Users.AddAsync(user);
            await db.SaveChangesAsync();

            return TypedResults.Created();
        }

    }
}
