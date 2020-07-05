namespace Service.ValidationServices.Domains
{
    public class RegistrationModel
    {
        public string ActivationCode { get; set; }
        public string UserEmail { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
    }
}
