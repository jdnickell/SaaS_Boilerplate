using System;

namespace DataAccess
{
    public class ChangeTrackingBaseEntity
    {
        //TODO: CreateDateTime / CreateById should not be nullable
        public int Id { get; set; }
        public DateTime? CreateDateTime { get; set; }
        public DateTime? UpdateDateTime { get; set; }
        public int? CreateById { get; set; }
        public int? UpdateById { get; set; }
    }
}
