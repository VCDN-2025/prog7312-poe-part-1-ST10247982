using Microsoft.EntityFrameworkCore;
using UrbanSync.Server.Data;
using UrbanSync.Server.Models;
namespace UrbanSync.Server.Controller {
    using BCrypt.Net;
    using FluentValidation;
    using FluentValidation.Results;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using System.ComponentModel.DataAnnotations;
    using UrbanSync.Server.DTO;
    using UrbanSync.Server.Services;
    using ValidationResult = FluentValidation.Results.ValidationResult;

    public static class AuthController {
        public static async Task<IResult> LoginUser([FromBody] BaseUserDto userDto, [FromServices] UrbanSyncDb context, [FromServices] TokenProvider tokenProvider) {

            if (string.IsNullOrEmpty(userDto.Username)) { throw new ArgumentNullException("email"); }
            if (string.IsNullOrEmpty(userDto.Password)) { throw new ArgumentNullException("password"); }


            User? foundUser = await context.Users.Where(u => u.Username == userDto.Username)
                .AsNoTracking()
                .FirstOrDefaultAsync<User>();

            if (foundUser == null) {
                return TypedResults.NotFound();
            }
            bool validPassword = BCrypt.Verify(userDto.Password, foundUser.PasswordHash);
            if (!validPassword) {
                return TypedResults.Unauthorized();
            }
            string token = tokenProvider.Create(foundUser);
            return TypedResults.Ok(new {
                Token = token
            });
        }

        public static async Task<IResult> RegisterUser([FromBody] UserRegisterDto registerDto, [FromServices] UrbanSyncDb db, [FromServices] IValidator<User> validator, [FromServices] ILogger<User> logger) {
            // we can add a custom validator tomorrow

            User user = new User {
                Username = registerDto.Username,
                DateOfRegistrstion = registerDto.DateOfRegistrstion,
                Email = registerDto.Email,
                Name = registerDto.Name,
                PasswordHash = registerDto.Password
            };

            ValidationResult result = await validator.ValidateAsync(user);
            if (!result.IsValid) {
                var errors = result.Errors.Select(e => new { e.PropertyName, e.ErrorMessage });
                logger.LogWarning("Validation failed for {Email}: {@Errors}", registerDto.Email, errors);
                return TypedResults.BadRequest(new { Errors = errors });
            }
            try {
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
            catch (Exception ex) {
                logger.LogError(ex, "Internal server error while registering user {Email}", registerDto.Email);
                return TypedResults.Problem("An unexpected error occurred while creating the user.");
            }

        }
    }
}
