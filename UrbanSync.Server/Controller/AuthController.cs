using Microsoft.EntityFrameworkCore;
using UrbanSync.Server.Data;
using UrbanSync.Server.Models;
namespace UrbanSync.Server.Controller {
    using BCrypt.Net;

    public static class AuthController {
        public static async Task<IResult> LoginUser(string email, string password, UrbanSyncDb context) {

            if (string.IsNullOrEmpty(email)) { throw new ArgumentNullException("email"); }
            if (string.IsNullOrEmpty(password)) { throw new ArgumentNullException("password"); }

            string passwordHash = BCrypt.HashPassword(password);
            User? foundUser = await context.Users.Where(u => u.Email == email && u.PasswordHash == passwordHash).FirstOrDefaultAsync<User>();

            if (foundUser == null) {
                return TypedResults.NotFound();
            }
            return TypedResults.Ok(new {        // create a record dto and also return jwts
                foundUser.Name,
                foundUser.Email,

            });
        }

        public static async Task<IResult> RegisterUser()
    }
}
