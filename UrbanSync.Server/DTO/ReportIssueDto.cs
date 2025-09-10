using UrbanSync.Server.Models;

namespace UrbanSync.Server.DTO {

    public record ReportIssueDto(
        string Location,
         string Description,
          string? Image,
          string Status,
          string MunicipalityLevel,
           string MunicipalitySector,
            DateTime DateOfCreation  ) {

    }
}
