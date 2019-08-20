using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using ServiceWebsite.Configuration;

namespace ServiceWebsite.AcceptanceTests.Helpers
{
    public class ConfigurationHelper
    {
        public static IConfigurationRoot BuildDefaultConfigRoot()
        {
            var configRootBuilder = new ConfigurationBuilder()
             .AddJsonFile("appsettings.json")
             .AddEnvironmentVariables()
             .AddUserSecrets("CF5CDD5E-FD74-4EDE-8765-2F899C252122"); //TODO: Ask if this should be here?

            return configRootBuilder.Build();
        }

        public static string GetBearerToken(IConfigurationRoot configRoot)
        {
            var azureAdConfig = Options.Create(configRoot.GetSection("AzureAd").Get<SecuritySettings>()).Value;
            var vhServiceConfig = Options.Create(configRoot.GetSection("VhServices").Get<ServiceSettings>()).Value;
            var authContext = new AuthenticationContext(azureAdConfig.Authority);
            var credential = new ClientCredential(azureAdConfig.ClientId, azureAdConfig.ClientSecret);
            var token = authContext.AcquireTokenAsync(vhServiceConfig.BookingsApiResourceId, credential).Result.AccessToken;

            return token;
        }
    }
}
