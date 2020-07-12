using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.ValidationServices;
using Service.ValidationServices.Models;
using Service.ValidationServices.Enums;
using Service.AuthenticationServices;
using Service.AuthenticationServices.Models;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class AccountController : ControllerBase
    {
        private readonly IValidateRegistrationCommand _validateRegistrationCommand;
        private readonly IAuthenticateUserCommand _authenticateUserCommand;

        public AccountController(IValidateRegistrationCommand validateRegistrationCommand, IAuthenticateUserCommand authenticateUserCommand)
        {
            _validateRegistrationCommand = validateRegistrationCommand;
            _authenticateUserCommand = authenticateUserCommand;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Auth is working.");
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> RegisterAsync(RegistrationModel registrationModel)
        {
            var registrationValidationResult = await _validateRegistrationCommand.ExecuteAsync(registrationModel);

            if (registrationValidationResult == ValidateRegistrationResultType.Success)
            {
                //TODO mapping and result handling //wrap this logic in another command - RegisterAndSignIn
                var authResult = await _authenticateUserCommand.ExecuteAsync(
                    new AuthenticationRequest
                    {
                        Username = registrationModel.UserEmail,
                        Password = registrationModel.Password
                    });
                return Ok(authResult);
            }

            if (registrationValidationResult == ValidateRegistrationResultType.UnknownError)
                return Problem(title: "An error occurred while processing your request", statusCode: 500);
            
            //TODO: returning Ok except an unexpected error, need to format and return message, 200 should indicate registration and authentication successful
            return Ok(registrationValidationResult);
        }
    }
}
