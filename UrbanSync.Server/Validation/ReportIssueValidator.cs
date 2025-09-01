using FluentValidation;
using UrbanSync.Server.Models;

namespace UrbanSync.Server.Validation {
    public class ReportIssueValidator:AbstractValidator<ReportedIssue> {
        public ReportIssueValidator() {
            RuleFor(report=> report.Id).NotEmpty().NotEmpty();
            RuleFor(report=>report.UserId).NotEmpty().NotNull();
            RuleFor(report=>report.Description).MinimumLength(10);
            RuleFor(report=> report.Image).NotEmpty();
        }
    }
}
