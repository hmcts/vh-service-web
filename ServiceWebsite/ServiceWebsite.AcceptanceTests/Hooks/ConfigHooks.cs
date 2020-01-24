using System.Collections.Generic;
using AcceptanceTests.Common.Configuration;
using AcceptanceTests.Common.Configuration.Users;
using AcceptanceTests.Common.Data.TestData;
using FluentAssertions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using ServiceWebsite.AcceptanceTests.Configuration;
using ServiceWebsite.AcceptanceTests.Data;
using ServiceWebsite.AcceptanceTests.Data.TestData;
using TechTalk.SpecFlow;
using TestContext = ServiceWebsite.AcceptanceTests.Helpers.TestContext;

namespace ServiceWebsite.AcceptanceTests.Hooks
{
    [Binding]
    public class ConfigHooks
    {
        private readonly IConfigurationRoot _configRoot;

        public ConfigHooks(TestContext context)
        {
            _configRoot = new ConfigurationManager("CF5CDD5E-FD74-4EDE-8765-2F899C252122").BuildConfig();
            context.ServiceWebConfig = new ServiceWebConfig();
            context.UserAccounts = new List<UserAccount>();
            context.Tokens = new ServiceWebTokens();
        }

        [BeforeScenario(Order = (int)HooksSequence.ConfigHooks)]
        public void RegisterSecrets(TestContext context)
        {
            RegisterAzureSecrets(context);
            RegisterTestUserSecrets(context);
            RegisterTestUsers(context);
            RegisterDefaultData(context);
            RegisterHearingServices(context);
            RegisterSauceLabsSettings(context);
            RunningServiceWebLocally(context);
            GenerateBearerTokens(context);
        }

        private void RegisterAzureSecrets(TestContext context)
        {
            context.ServiceWebConfig.AzureAdConfiguration = Options.Create(_configRoot.GetSection("AzureAd").Get<ServiceWebSecurityConfiguration>()).Value;
            ConfigurationManager.VerifyConfigValuesSet(context.ServiceWebConfig.AzureAdConfiguration);
        }

        private void RegisterTestUserSecrets(TestContext context)
        {
            context.ServiceWebConfig.TestConfig = Options.Create(_configRoot.GetSection("TestUserSecrets").Get<ServiceWebTestConfig>()).Value;
            context.ServiceWebConfig.TestConfig.CommonData = new LoadXmlFile().SerialiseCommonData();
            context.ServiceWebConfig.TestConfig.TestData = new DefaultDataManager().SerialiseTestData();
            ConfigurationManager.VerifyConfigValuesSet(context.ServiceWebConfig.TestConfig);
        }

        private void RegisterTestUsers(TestContext context)
        {
            context.UserAccounts = Options.Create(_configRoot.GetSection("UserAccounts").Get<List<UserAccount>>()).Value;
            context.UserAccounts.Should().NotBeNullOrEmpty();
            foreach (var user in context.UserAccounts)
            {
                user.Key = user.Lastname;
                user.Username = $"{user.DisplayName.Replace(" ", "").Replace("ClerkJudge", "Clerk")}{context.ServiceWebConfig.TestConfig.TestUsernameStem}";
            }
        }

        private static void RegisterDefaultData(TestContext context)
        {
            context.Test = new Test {Answers = new List<SuitabilityAnswer>()};
        }

        private void RegisterHearingServices(TestContext context)
        {
            context.ServiceWebConfig.VhServices = Options.Create(_configRoot.GetSection("VhServices").Get<ServiceWebVhServicesConfig>()).Value;
            ConfigurationManager.VerifyConfigValuesSet(context.ServiceWebConfig.VhServices);
        }

        private void RegisterSauceLabsSettings(TestContext context)
        {
            context.ServiceWebConfig.SauceLabsConfiguration = Options.Create(_configRoot.GetSection("Saucelabs").Get<SauceLabsSettingsConfig>()).Value;
            if (context.ServiceWebConfig.SauceLabsConfiguration.RunningOnSauceLabs())
                context.ServiceWebConfig.SauceLabsConfiguration.SetRemoteServerUrlForDesktop(context.ServiceWebConfig.TestConfig.CommonData.CommonConfig.SauceLabsServerUrl);
        }

        private static void RunningServiceWebLocally(TestContext context)
        {
            context.ServiceWebConfig.VhServices.RunningServiceWebLocally = context.ServiceWebConfig.VhServices.ServiceWebUrl.Contains("localhost");
        }

        private static async void GenerateBearerTokens(TestContext context)
        {
            context.Tokens.BookingsApiBearerToken = await ConfigurationManager.GetBearerToken(
                context.ServiceWebConfig.AzureAdConfiguration, context.ServiceWebConfig.VhServices.BookingsApiResourceId);
            context.Tokens.BookingsApiBearerToken.Should().NotBeNullOrEmpty();

            context.Tokens.UserApiBearerToken = await ConfigurationManager.GetBearerToken(
                context.ServiceWebConfig.AzureAdConfiguration, context.ServiceWebConfig.VhServices.UserApiResourceId);
            context.Tokens.UserApiBearerToken.Should().NotBeNullOrEmpty();

            context.Tokens.VideoApiBearerToken = await ConfigurationManager.GetBearerToken(
                context.ServiceWebConfig.AzureAdConfiguration, context.ServiceWebConfig.VhServices.VideoApiResourceId);
            context.Tokens.VideoApiBearerToken.Should().NotBeNullOrEmpty();
        }
    }
}
