using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.ValidationServices;
using Service.ValidationServices.Domains;
using Service.ValidationServices.Enums;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [AllowAnonymous]
    public class AccountController : ControllerBase
    {
        private readonly IValidateRegistrationCommand _validateRegistrationCommand;

        public AccountController(IValidateRegistrationCommand validateRegistrationCommand)
        {
            _validateRegistrationCommand = validateRegistrationCommand;
        }

        [HttpPost]
        public async Task<IActionResult> RegisterAsync(RegistrationModel registrationModel)
        {
            var registrationValidationResult = await _validateRegistrationCommand.ExecuteAsync(registrationModel);

            if (registrationValidationResult == ValidateRegistrationResultType.UnknownError)
                return Problem(title: "An error occurred while processing your request", statusCode: 500);
            
            //TODO: returning Ok for any unexpected error, need to format and return message
            return Ok(registrationValidationResult);
        }
    }
}
