using System.Collections.Generic;
using System.Threading.Tasks;
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
            _configRoot = ConfigurationManager.BuildConfig("CF5CDD5E-FD74-4EDE-8765-2F899C252122", GetTargetEnvironment(), RunOnSauceLabsFromLocal());
            context.WebConfig = new ServiceWebConfig();
            context.UserAccounts = new List<UserAccount>();
            context.Tokens = new ServiceWebTokens();
        }

        private static string GetTargetEnvironment()
        {
            return NUnit.Framework.TestContext.Parameters["TargetEnvironment"] ?? "";
        }

        private static bool RunOnSauceLabsFromLocal()
        {
            return NUnit.Framework.TestContext.Parameters["RunOnSauceLabs"] != null &&
                   NUnit.Framework.TestContext.Parameters["RunOnSauceLabs"].Equals("true");
        }

        [BeforeScenario(Order = (int)HooksSequence.ConfigHooks)]
        public async Task RegisterSecrets(TestContext context)
        {
            RegisterAzureSecrets(context);
            RegisterTestUserSecrets(context);
            RegisterTestUsers(context);
            RegisterDefaultData(context);
            RegisterHearingServices(context);
            RegisterSauceLabsSettings(context);
            RunningServiceWebLocally(context);
            await GenerateBearerTokens(context);
        }

        private void RegisterAzureSecrets(TestContext context)
        {
            context.WebConfig.AzureAdConfiguration = Options.Create(_configRoot.GetSection("AzureAd").Get<ServiceWebSecurityConfiguration>()).Value;
            ConfigurationManager.VerifyConfigValuesSet(context.WebConfig.AzureAdConfiguration);
        }

        private void RegisterTestUserSecrets(TestContext context)
        {
            context.WebConfig.TestConfig = Options.Create(_configRoot.GetSection("TestUserSecrets").Get<ServiceWebTestConfig>()).Value;
            context.WebConfig.TestConfig.CommonData = LoadXmlFile.SerialiseCommonData();
            context.WebConfig.TestConfig.TestData = new DefaultDataManager().SerialiseTestData();
            context.WebConfig.TestConfig.TargetBrowser.Should().NotBeNull();
            context.WebConfig.TestConfig.TargetDevice.Should().NotBeNull();
            context.WebConfig.TestConfig.TargetOS.Should().NotBeNull();
            context.WebConfig.TestConfig.TestUsernameStem.Should().NotBeNull();
            context.WebConfig.TestConfig.TestUserPassword.Should().NotBeNull();
        }

        private void RegisterTestUsers(TestContext context)
        {
            context.UserAccounts = Options.Create(_configRoot.GetSection("UserAccounts").Get<List<UserAccount>>()).Value;
            context.UserAccounts.Should().NotBeNullOrEmpty();
            foreach (var user in context.UserAccounts)
            {
                user.Key = user.Lastname;
                user.Username = $"{user.DisplayName.Replace(" ", "").Replace("ClerkJudge", "Clerk")}{context.WebConfig.TestConfig.TestUsernameStem}";
            }
        }

        private static void RegisterDefaultData(TestContext context)
        {
            context.Test = new Test {Answers = new List<SuitabilityAnswer>()};
        }

        private void RegisterHearingServices(TestContext context)
        {
            context.WebConfig.VhServices = Options.Create(_configRoot.GetSection("VhServices").Get<ServiceWebVhServicesConfig>()).Value;
            ConfigurationManager.VerifyConfigValuesSet(context.WebConfig.VhServices);
        }

        private void RegisterSauceLabsSettings(TestContext context)
        {
            context.WebConfig.SauceLabsConfiguration = Options.Create(_configRoot.GetSection("Saucelabs").Get<SauceLabsSettingsConfig>()).Value;
            if (!context.WebConfig.SauceLabsConfiguration.RunningOnSauceLabs()) return;
            context.WebConfig.SauceLabsConfiguration.SetRemoteServerUrlForDesktop(context.WebConfig.TestConfig.CommonData.CommonConfig.SauceLabsServerUrl);
            context.WebConfig.SauceLabsConfiguration.AccessKey.Should().NotBeNullOrWhiteSpace();
            context.WebConfig.SauceLabsConfiguration.Username.Should().NotBeNullOrWhiteSpace();
            context.WebConfig.SauceLabsConfiguration.RealDeviceApiKey.Should().NotBeNullOrWhiteSpace();
        }

        private static void RunningServiceWebLocally(TestContext context)
        {
            context.WebConfig.VhServices.RunningServiceWebLocally = context.WebConfig.VhServices.ServiceWebUrl.Contains("localhost");
        }

        private static async Task GenerateBearerTokens(TestContext context)
        {
            context.Tokens.BookingsApiBearerToken = await ConfigurationManager.GetBearerToken(
                context.WebConfig.AzureAdConfiguration, context.WebConfig.VhServices.BookingsApiResourceId);
            context.Tokens.BookingsApiBearerToken.Should().NotBeNullOrEmpty();

            context.Tokens.VideoApiBearerToken = await ConfigurationManager.GetBearerToken(
                context.WebConfig.AzureAdConfiguration, context.WebConfig.VhServices.VideoApiResourceId);
            context.Tokens.VideoApiBearerToken.Should().NotBeNullOrEmpty();

            context.Tokens.UserApiBearerToken = await ConfigurationManager.GetBearerToken(
                context.WebConfig.AzureAdConfiguration, context.WebConfig.VhServices.UserApiResourceId);
            context.Tokens.UserApiBearerToken.Should().NotBeNullOrEmpty();
        }
    }
}
