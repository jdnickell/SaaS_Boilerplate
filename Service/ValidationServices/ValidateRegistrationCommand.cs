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

                var userActivationCodes = await _dataContext.ActivationCode
                    .Include(x => x.ApplicationUser)
                    .Where(x => x.Code == registrationModel.ActivationCode && x.IsActive)
                    .ToListAsync();

                if (userActivationCodes.Count == 0)
                    return ValidateRegistrationResultType.InvalidActivationCode;

                if (userActivationCodes.Where(x => x.ApplicationUser != null)?.Count() > MAXIMUM_ACTIVATION_CODE_USES)
                    return ValidateRegistrationResultType.MaximumActivationCodeUsesExceeded;

                var applicationUser = new ApplicationUser
                {
                    Email = registrationModel.UserEmail,
                    FirstName = registrationModel.FirstName,
                    LastName = registrationModel.LastName,
                    UserName = registrationModel.UserEmail,
                    ActivationCodeId = userActivationCodes.First().Id
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
