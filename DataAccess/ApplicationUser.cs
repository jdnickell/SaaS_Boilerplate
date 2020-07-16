using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess
{
    public class ApplicationUser : IdentityUser
    {
        [ForeignKey("ActivationCodeId")]
        public int ActivationCodeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public ActivationCode ActivationCode { get; set; }
    }
}
