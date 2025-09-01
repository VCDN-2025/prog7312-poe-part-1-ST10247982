using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using UrbanSync.Server.Data;
using UrbanSync.Server.Models;

namespace UrbanSync.Server.Controller {

    public static class AuthController {
        static async Task<IResult> LoginUser(string email, string password, UrbanSyncDb context) {
            if (string.IsNullOrEmpty(email)) { throw new ArgumentNullException("email"); }
            if (string.IsNullOrEmpty(password)) { throw new ArgumentNullException("password"); }
            User? foundUser = await context.Users.Where(u => u.Email == email && u.PasswordHash == password).FirstOrDefaultAsync<User>();
            if (foundUser == null) {
                return TypedResults.NotFound();
            }
            return TypedResults.Ok(new {
                foundUser.Name,
                foundUser.Email,

            });
        }
    }
}
