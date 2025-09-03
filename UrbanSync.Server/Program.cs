
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using UrbanSync.Server.Data;
using UrbanSync.Server.Exceptions;
using UrbanSync.Server.Models;
using UrbanSync.Server.Route;
using UrbanSync.Server.Services;
using UrbanSync.Server.Validation;

namespace UrbanSync.Server {
    public class Program {
        public static void Main(string[] args) {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddProblemDetails();

            var connectionString = builder.Configuration.GetConnectionString("DefaultConnectionString")
                ?? throw new InvalidOperationException("Connection String" + "Default Connection String not found");
            builder.Services.AddDbContext<UrbanSyncDb>(options =>
                options.UseSqlServer(connectionString));
            builder.Services.AddProblemDetails(config =>
            config.CustomizeProblemDetails = context => {
                context.ProblemDetails.Extensions.TryAdd("requestId", context.HttpContext.TraceIdentifier);
            });
            builder.Services.AddExceptionHandler<ValidationExceptionHandler>();
            builder.Services.AddExceptionHandler<GlobalException>();
            // Add services to the container.
            builder.Services.AddAuthentication().AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, jwtOptions => {

                // Optional if the MetadataAddress is specified

                jwtOptions.RequireHttpsMetadata = false;
                jwtOptions.TokenValidationParameters = new TokenValidationParameters {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = builder.Configuration.GetSection("Jwt:Issuer").Get<string>(),
                    ValidAudience = builder.Configuration.GetSection("Jwt:Audience").Get<string>(),
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"]!)),
                    ClockSkew = TimeSpan.Zero
                };

                jwtOptions.MapInboundClaims = false;
                jwtOptions.Events = new JwtBearerEvents {
                    OnMessageReceived = context =>
                    {
                        // If the Authorization header is missing,
                        // try to get the token from the cookie
                        if (string.IsNullOrEmpty(context.Token) &&
                            context.Request.Cookies.ContainsKey("Token")) {
                            context.Token = context.Request.Cookies["Token"];
                        }

                        return Task.CompletedTask;
                    }
                };
            });

            builder.Services.AddAuthorization();
          
    
            builder.Services.AddSingleton<TokenProvider>();
            // Requires Microsoft.AspNetCore.Authentication.JwtBearer
            builder.Services.AddScoped<IValidator<User>, UserValidator>();
            builder.Services.AddScoped<IValidator<ReportedIssue>, ReportIssueValidator>();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGenWithAuth();


            var app = builder.Build();

            // app.UseCors();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment()) {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseExceptionHandler();
            app.UseAuthentication();
            app.UseAuthorization();

            app.MapGroup("/api/auth")
                 .MapAuthAPi()
                 .WithTags("public");
            app.MapGroup("api/reportissue")
                .MapReportIssueApi()
                .WithTags("public")
                .RequireAuthorization();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
