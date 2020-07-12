namespace Domain.Configuration
{
    public static class Authentication
    {
        public static string Secret { get; set; }
        public static double SecurityTokenDescriptorExpirationMinutes { get; set; }
    }
}
