using FluentValidation;
using Microsoft.AspNetCore.Diagnostics;
using ValidationException = FluentValidation.ValidationException;

namespace UrbanSync.Server.Exceptions {

    public sealed class ValidationExceptionHandler(IProblemDetailsService problemDetailsService, ILogger<ValidationExceptionHandler> logger) : IExceptionHandler {
        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken) {
            if (exception is not ValidationException validationException) {
                return false;
            }
            logger.LogError(exception, "Invalid data was submitted");

            httpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
            var context = new ProblemDetailsContext {
                HttpContext = httpContext,
                Exception = exception,
                ProblemDetails = new Microsoft.AspNetCore.Mvc.ProblemDetails {
                    Detail = "One or more validation errors occured",
                    Status = StatusCodes.Status400BadRequest,

                }
            };
            var errors = validationException.Errors
                .GroupBy(e => e.PropertyName)
                .ToDictionary(g => g.Key.ToLowerInvariant(),
                g => g.Select(e => e.ErrorMessage)
                );
            context.ProblemDetails.Extensions.Add("errors", errors);
            return await problemDetailsService.TryWriteAsync(context);
        }
    }
}
