using DataAccess;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Service.AuthenticationServices.Models;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Service.AuthenticationServices
{
    public class AuthenticateUserCommand : IAuthenticateUserCommand
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public AuthenticateUserCommand(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<AuthenticationResult> ExecuteAsync(AuthenticationRequest authenticationRequest)
        {
            var user = await _userManager.FindByNameAsync(authenticationRequest.Username);
            var isValidCredentials = await _userManager.CheckPasswordAsync(user, authenticationRequest.Password);
    
            if (!isValidCredentials) return null;

            var authenticationResult = new AuthenticationResult
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Token = GenerateJwt(user),
                Username = user.UserName
            };

            return authenticationResult;
        }

        private string GenerateJwt(ApplicationUser user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Domain.Configuration.Authentication.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id)
                }),
                Expires = DateTime.UtcNow.AddMinutes(Domain.Configuration.Authentication.SecurityTokenDescriptorExpirationMinutes),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }

    public interface IAuthenticateUserCommand
    {
        Task<AuthenticationResult> ExecuteAsync(AuthenticationRequest AathenticationRequest);
    }
}
