using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using ServiceWebsite.AcceptanceTests.Configuration;
using ServiceWebsite.AcceptanceTests.Contexts;
using ServiceWebsite.Configuration;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Hooks
{
    [Binding]
    public class DataSetUp
    {
        [BeforeScenario()]
        public void OneTimeSetup(TestContext testContext)
        {
            var configRootBuilder = new ConfigurationBuilder()
             .AddJsonFile("appsettings.json")
             .AddEnvironmentVariables()
             .AddUserSecrets("CF5CDD5E-FD74-4EDE-8765-2F899C252122");
            var configRoot = configRootBuilder.Build();

            var azureAdConfig = Options.Create(configRoot.GetSection("AzureAd").Get<SecuritySettings>()).Value;
            var vhServiceConfig = Options.Create(configRoot.GetSection("VhServices").Get<ServiceSettings>()).Value;
            var userAccountConfig = Options.Create(configRoot.GetSection("TestUserSecrets").Get<UserAccount>()).Value;
            var authContext = new AuthenticationContext(azureAdConfig.Authority);
            var credential = new ClientCredential(azureAdConfig.ClientId, azureAdConfig.ClientSecret);
            testContext.BearerToken = authContext.AcquireTokenAsync(vhServiceConfig.BookingsApiResourceId, credential).Result.AccessToken;
            testContext.BaseUrl = vhServiceConfig.BookingsApiUrl;
            testContext.TestUserSecrets = userAccountConfig;
            testContext.AzureAd = azureAdConfig;
        }
    }
}