
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using UrbanSync.Server.Data;
using UrbanSync.Server.Models;
using UrbanSync.Server.Validation;

namespace UrbanSync.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddProblemDetails();
            var connectionString = builder.Configuration.GetConnectionString("DefaultConnectionString")
                ?? throw new InvalidOperationException("Connection String" + "Default Connection String not found");
            builder.Services.AddDbContext<UrbanSyncDb>(options =>
                options.UseSqlServer(connectionString));
            // Add services to the container.
            builder.Services.AddAuthorization();
            builder.Services.AddAuthentication();
            // Requires Microsoft.AspNetCore.Authentication.JwtBearer
           builder.Services.AddScoped<IValidator<User>, UserValidator>();
            builder.Services.AddScoped<IValidator<ReportedIssue>, ReportIssueValidator>();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

       
            var app = builder.Build();

           // app.UseCors();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseExceptionHandler();
            app.UseAuthorization();

            var summaries = new[]
            {
                "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
            };

            

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
