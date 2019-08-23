using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using ServiceWebsite.AcceptanceTests.Configuration;
using ServiceWebsite.AcceptanceTests.Contexts;
using ServiceWebsite.Configuration;

namespace ServiceWebsite.AcceptanceTests.Helpers
{
    public class ConfigurationHelper
    {
        private const string INDIVIDUAL_TEST_ACCOUNT = "video-hearing-booking-creation-individual@hmctest.com";
        private const string REPRESENTATIVE_TEST_ACCOUNT = "video-hearing-booking-creation-representative@hmctest.com";

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

        public static TestContext ParseConfigurationIntoTestContext(IConfigurationRoot configRoot, TestContext testContext)
        {
            var azureAdConfig = Options.Create(configRoot.GetSection("AzureAd").Get<SecuritySettings>()).Value;
            var vhServiceConfig = Options.Create(configRoot.GetSection("VhServices").Get<ServiceSettings>()).Value;
            var userAccountConfig = Options.Create(configRoot.GetSection("TestUserSecrets").Get<UserAccount>()).Value;
            var authContext = new AuthenticationContext(azureAdConfig.Authority);
            var credential = new ClientCredential(azureAdConfig.ClientId, azureAdConfig.ClientSecret);
            testContext.BearerToken = authContext.AcquireTokenAsync(vhServiceConfig.BookingsApiResourceId, credential).Result.AccessToken;
            testContext.BaseUrl = vhServiceConfig.BookingsApiUrl;
            testContext.TestUserSecrets = userAccountConfig;
            testContext.AzureAd = azureAdConfig;
            testContext.WebsiteUrl = configRoot.GetSection("WebsiteUrl").Value;
            testContext.VideoAppUrl = configRoot.GetSection("VideoAppUrl").Value;

            return testContext;
        }

        public static IEnumerable<KeyValuePair<string, string>> GetActualConfigAsEnumerable()
        {
            var configRoot = ConfigurationHelper.BuildDefaultConfigRoot();
            return configRoot.AsEnumerable();
        }

        public static KeyValuePair<string, string> FindExpectedConfigItemInActualConfig(string expectedConfigItem, IEnumerable<KeyValuePair<string, string>> configEnumarable)
        {
            KeyValuePair<string, string> actualConfigItem = new KeyValuePair<string, string>();
            foreach (var configItem in configEnumarable)
            {
                if (configItem.Key.StartsWith(expectedConfigItem, StringComparison.Ordinal))
                {
                    actualConfigItem = configItem;
                    break;
                }
            }

            return actualConfigItem;
        }

        public static UserAccount GetUserAccountForTests(IConfigurationRoot configRoot, bool useAccountExternalUsername)
        {
            UserAccount userAccount = new UserAccount();

            if (!useAccountExternalUsername)
            {
                userAccount = Options.Create(configRoot.GetSection("TestUserSecrets").Get<UserAccount>()).Value;
            }
            else
            {
                userAccount.Individual = INDIVIDUAL_TEST_ACCOUNT;
                userAccount.Representative = REPRESENTATIVE_TEST_ACCOUNT;
            }

            return userAccount;
        }
    }
}
