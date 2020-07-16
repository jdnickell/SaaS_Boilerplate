using DataAccess;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Service.ValidationServices.Models;
using Service.ValidationServices.Enums;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Service.ValidationServices
{
    public class ValidateRegistrationCommand : IValidateRegistrationCommand
    {
        private readonly DataContext _dataContext;
        private readonly UserManager<ApplicationUser> _userManager;

        const int MAXIMUM_ACTIVATION_CODE_USES = 2;

        public ValidateRegistrationCommand(DataContext dataContext, UserManager<ApplicationUser> userManager)
        {
            _dataContext = dataContext;
            _userManager = userManager;
        }

        public async Task<ValidateRegistrationResultType> ExecuteAsync(RegistrationModel registrationModel)
        {
            try
            {
                if (await _dataContext.Users.FirstOrDefaultAsync(x => x.Email == registrationModel.UserEmail) != null)
                    return ValidateRegistrationResultType.ExistingEmail;

                var userActivationCode = await _dataContext.ActivationCode
                    .Include(x => x.ApplicationUsers)
                    .Where(x => x.Code == registrationModel.ActivationCode && x.IsActive)
                    .FirstOrDefaultAsync();

                if (userActivationCode == null)
                    return ValidateRegistrationResultType.InvalidActivationCode;

                if (userActivationCode.ApplicationUsers?.Count() >= MAXIMUM_ACTIVATION_CODE_USES)
                    return ValidateRegistrationResultType.MaximumActivationCodeUsesExceeded;

                var applicationUser = new ApplicationUser
                {
                    Email = registrationModel.UserEmail,
                    FirstName = registrationModel.FirstName,
                    LastName = registrationModel.LastName,
                    UserName = registrationModel.UserEmail,
                    ActivationCodeId = userActivationCode.Id
                };

                var result = await _userManager.CreateAsync(applicationUser, registrationModel.Password);

                if (result.Succeeded)
                {
                    return ValidateRegistrationResultType.Success;
                }
                else
                {
                    //TODO: Log result.Errors
                    return ValidateRegistrationResultType.UnknownError;
                }
            }
            catch (Exception registrationValidationException)
            {
                //TODO: Log this
                registrationValidationException.Message.ToString();
                return ValidateRegistrationResultType.UnknownError;
            }
        }
    }

    public interface IValidateRegistrationCommand
    {
        Task<ValidateRegistrationResultType> ExecuteAsync(RegistrationModel registrationModel);
    }
}
