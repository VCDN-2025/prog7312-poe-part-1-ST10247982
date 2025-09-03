namespace UrbanSync.Server.Validation {
    using FluentValidation;
    using UrbanSync.Server.Models;

    public class UserValidator : AbstractValidator<User> {
        public UserValidator() {
            RuleFor(user => user.Username).NotEmpty().NotNull().MinimumLength(4);
            RuleFor(user => user.PasswordHash)
    .NotEmpty().NotNull().WithMessage("Password is required.")
    .MinimumLength(8).WithMessage("Password must be at least 8 characters long.")
    .Matches("[A-Z]").WithMessage("Password must contain at least one uppercase letter.")
    .Matches("[a-z]").WithMessage("Password must contain at least one lowercase letter.")
    .Matches("[0-9]").WithMessage("Password must contain at least one number.")
    .Matches("[!@#$%^&*()_+=\\[\\]{};':\"\\\\|,.<>/?~]").WithMessage("Password must contain at least one special character.");
            RuleFor(user => user.Email).EmailAddress().NotNull();
            RuleFor(user => user.DateOfRegistrstion).NotEmpty().NotNull();
            RuleFor(user => user.Name).NotEmpty().MinimumLength(3).NotNull();
            RuleFor(user => user.Id).NotNull().NotEmpty();
        }
    }
}
