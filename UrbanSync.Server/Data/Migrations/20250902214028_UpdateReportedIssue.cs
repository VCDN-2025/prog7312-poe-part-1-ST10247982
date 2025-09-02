using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UrbanSync.Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdateReportedIssue : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MunicipalityLevel",
                table: "ReportedIssues",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MunicipalitySector",
                table: "ReportedIssues",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MunicipalityLevel",
                table: "ReportedIssues");

            migrationBuilder.DropColumn(
                name: "MunicipalitySector",
                table: "ReportedIssues");
        }
    }
}
