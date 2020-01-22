using AcceptanceTests.Common.Configuration;

namespace ServiceWebsite.AcceptanceTests.Configuration
{
    public class ServiceWebConfig
    {
        public ServiceWebSecurityConfiguration AzureAdConfiguration { get; set; }
        public ServiceWebTestConfig TestConfig { get; set; }
        public ServiceWebVhServicesConfig VhServices { get; set; }
        public SauceLabsSettingsConfig SauceLabsConfiguration { get; set; }
    }
}
