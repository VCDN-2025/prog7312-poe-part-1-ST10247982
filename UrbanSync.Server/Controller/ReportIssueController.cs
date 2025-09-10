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
    public static class ReportIssueController
    {
        // incorporate retry logic

        public static async Task<IResult> CreateAsync(
            HttpContext httpContext,
            [FromServices] IValidator<ReportedIssue> validator,
            [FromServices] ILogger<ReportedIssue> logger,
            [FromServices] UrbanSyncDb db,
            [FromBody] List<ReportIssueDto> reportIssueDtos)
        {
            // we will do the validation logic

            if (reportIssueDtos is null) throw new BadHttpRequestException("No issues were reported/sent");
            string userId = httpContext.User.FindFirst(JwtRegisteredClaimNames.Sub)!.Value;

            SimpleList<ReportedIssue> reportedIssues = new SimpleList<ReportedIssue>(reportIssueDtos.Count);
            foreach (var currentReportDto in reportIssueDtos)
            {

                ReportedIssue reportedIssue = new()
                {
                    Id = Guid.NewGuid(),
                    Description = currentReportDto.Description,
                    Image = currentReportDto.Image,
                    Location = currentReportDto.Location,
                    MunicipalityLevel = currentReportDto.MunicipalityLevel,
                    MunicipalitySector = currentReportDto.MunicipalitySector,
                    UserId = Guid.Parse(userId),
                    DateOfCreation = DateTime.Now,
                    Status = "Processing"
                };
                await db.ReportedIssues.AddAsync(reportedIssue);
                await db.SaveChangesAsync();
            }


            return TypedResults.Json(reportIssueDtos, statusCode: 201, contentType: "application/json");

        }

        public async static Task<IResult> GetResultAsync(HttpContext httpContext, [FromServices] ILogger<ReportedIssue> logger, [FromServices] UrbanSyncDb db, [FromBody] PaginationDto pagination)
        {
            string userId = httpContext.User.FindFirst(JwtRegisteredClaimNames.Sub)!.Value;
            if (userId == null)
            {
                return TypedResults.BadRequest("User not logged in");
            }
            Guid guidUserId = Guid.Parse(userId);
            IList<ReportedIssue> reports = await db.ReportedIssues
            .Where(u => u.UserId == guidUserId )
            .OrderByDescending(r => r.DateOfCreation)
            .Skip((pagination.PageNumber - 1) * pagination.PageSize)
            .Take(pagination.PageSize)
         
            .AsNoTracking()
            .ToListAsync();
            if (reports.Count == 0)
            {
                return TypedResults.NoContent();
            }
            SimpleList<ReportIssueDto> responseList = new();

            foreach (ReportedIssue report in reports)
            {
                ReportIssueDto reportDto = new ReportIssueDto(
                    DateOfCreation: report.DateOfCreation,
                    Status: report.Status,
                    Description: report.Description,
                    Image: report.Image,
                    Location: report.Location,
                    MunicipalityLevel: report.MunicipalityLevel,
                    MunicipalitySector: report.MunicipalitySector
                );
                responseList.Add(reportDto);
            }
            return TypedResults.Ok(responseList);
        }
       

    }
}
