using FluentValidation;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System.IdentityModel.Tokens.Jwt;
using UrbanSync.Server.Data;
using UrbanSync.Server.DataStructures;
using UrbanSync.Server.DTO;
using UrbanSync.Server.Models;

namespace UrbanSync.Server.Controller {
    public static class ReportIssueController {
        // incorporate retry logic
        private static SimpleList<ReportedIssue> _toBeSaved = new(100);
        public static async Task<IResult> Create(HttpContext httpContext, [FromServices] IValidator<ReportedIssue> validator,[FromServices]ILogger<ReportedIssue> logger,[FromServices] UrbanSyncDb db,[FromBody] SimpleList<ReportIssueDto> reportIssueDtos) {
            // we will do the validation logic
            
            if (reportIssueDtos is null) throw new BadHttpRequestException("No issues were reported/sent");
            string userId = httpContext.User.FindFirst(JwtRegisteredClaimNames.Sub)!.Value;
            
            SimpleList<ReportedIssue> reportedIssues = new SimpleList<ReportedIssue>(reportIssueDtos.Count);
            foreach(var currentReportDto in reportIssueDtos) {
                
                ReportedIssue reportedIssue = new() {
                    Id = Guid.NewGuid(),
                    Description = currentReportDto.Description,
                    Image = currentReportDto.Image,
                    Location = currentReportDto.Location,
                    MunicipalityLevel = currentReportDto.MunicipalityLevel,
                    MunicipalitySector = currentReportDto.MunicipalitySector,
                    UserId = Guid.Parse(userId)
                };
               db.ReportedIssues.Add(reportedIssue);
            }
            
            
            return TypedResults.Json( reportIssueDtos , statusCode:201, contentType:"application/json");
         
        }
    }
}
