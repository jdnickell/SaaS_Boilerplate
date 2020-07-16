using System;
using System.Collections.Generic;

namespace DataAccess
{
    public class ActivationCode : ChangeTrackingBaseEntity
    {
        public string Code { get; set; }
        public DateTime DatePurchased { get; set; }
        public int PurchaserId { get; set; }
        public bool IsActive { get; set; }

       public ICollection<ApplicationUser> ApplicationUsers { get; set; }
    }
}
