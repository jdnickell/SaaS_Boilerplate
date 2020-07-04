using System;

namespace DataAccess
{
    public class ActivationCode : ChangeTrackingBaseEntity
    {
        public string Code { get; set; }
        public DateTime DatePurchased { get; set; }
        public int PurchaserId { get; set; }
        public bool IsActive { get; set; }

        public ApplicationUser ApplicationUser { get; set; }
    }
}
