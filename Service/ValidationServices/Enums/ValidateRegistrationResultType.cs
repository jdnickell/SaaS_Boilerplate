namespace Service.ValidationServices.Enums
{
    public enum ValidateRegistrationResultType
    {
        UnknownError,
        Success,
        ExistingEmail,
        InvalidActivationCode,
        MaximumActivationCodeUsesExceeded,
    }
}
