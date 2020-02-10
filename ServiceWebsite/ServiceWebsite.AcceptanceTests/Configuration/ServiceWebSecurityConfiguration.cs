using AcceptanceTests.Common.Configuration;

namespace ServiceWebsite.AcceptanceTests.Configuration
{
    public class ServiceWebSecurityConfiguration : IAzureAdConfig
    {
        public string Authority { get; set; }
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public string TenantId { get; set; }
        public string RedirectUri { get; set; }
        public string UserApiClientId { get; set; }
        public string UserApiClientSecret { get; set; }
    }
}
