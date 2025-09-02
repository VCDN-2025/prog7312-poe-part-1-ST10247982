using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using UrbanSync.Server.Models;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace UrbanSync.Server.Services {
    public class TokenProvider(IConfiguration configuration) {

        public string Create(User user) {
            string secretKey = configuration["Jwt:Secret"]!;
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var tokenDescription = new SecurityTokenDescriptor {
                Subject = new System.Security.Claims.ClaimsIdentity(
                    [
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email.ToString()),
                    new Claim("email_verified", user.IsAuthenticated.ToString())
                    ]),
                Expires = DateTime.UtcNow.AddDays(14),
                SigningCredentials = credentials, 
                Issuer = configuration["Jwt:Issuer"], 
                Audience = configuration["Jwt:Audience"],
                
            };
            var handler = new JsonWebTokenHandler();
            string token = handler.CreateToken(tokenDescription);
            return token;
        }
    }
}
