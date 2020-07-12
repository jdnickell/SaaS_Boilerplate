using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.AuthenticationServices;
using Service.AuthenticationServices.Models;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [AllowAnonymous]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticateUserCommand _authenticateUserCommand;

        public AuthenticationController(IAuthenticateUserCommand authenticateUserCommand)
        {
            _authenticateUserCommand = authenticateUserCommand;
        }

        [HttpPost]
        public async Task<IActionResult> AuthenticateAsync([FromBody]AuthenticationRequest authenticationRequest)
        {
            var response = await _authenticateUserCommand.ExecuteAsync(authenticationRequest);

            if (response == null)
                return BadRequest(new { message = "Incorrect username or password." });

            return Ok(response);
        }
    }
}
