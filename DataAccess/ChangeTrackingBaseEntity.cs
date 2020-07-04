using System;

namespace DataAccess
{
    public class ChangeTrackingBaseEntity
    {
        public int Id { get; set; }
        public DateTime? CreateDateTime { get; set; }
        public DateTime? UpdateDateTime { get; set; }
        public int CreateById { get; set; }
        public int UpdateById { get; set; }
    }
}
