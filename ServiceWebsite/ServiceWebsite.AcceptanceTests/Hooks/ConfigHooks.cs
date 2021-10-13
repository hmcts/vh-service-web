using System.Collections.Generic;
using System.Threading.Tasks;
using AcceptanceTests.Common.Configuration;
using AcceptanceTests.Common.Data.TestData;
using AcceptanceTests.Common.Exceptions;
using FluentAssertions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using ServiceWebsite.AcceptanceTests.Configuration;
using ServiceWebsite.AcceptanceTests.Data;
using ServiceWebsite.AcceptanceTests.Data.TestData;
using ServiceWebsite.Common.Configuration;
using ServiceWebsite.Common.Security;
using TechTalk.SpecFlow;
using TestApi.Contract.Dtos;
using TestContext = ServiceWebsite.AcceptanceTests.Helpers.TestContext;

namespace ServiceWebsite.AcceptanceTests.Hooks
{
    [Binding]
    public class ConfigHooks
    {
        private readonly IConfigurationRoot _configRoot;

        public ConfigHooks(TestContext context)
        {
            _configRoot = ConfigurationManager.BuildConfig("CF5CDD5E-FD74-4EDE-8765-2F899C252122", "c0ed2a82-9b1f-4dd2-925a-abb1740093dc");
            context.WebConfig = new ServiceWebConfig();
            context.Users = new List<UserDto>();
        }

        [BeforeScenario(Order = (int)HooksSequence.ConfigHooks)]
        public async Task RegisterSecrets(TestContext context)
        {
            RegisterAzureSecrets(context);
            RegisterTestUserSecrets(context);
            RegisterDefaultData(context);
            RegisterIsLive(context);
            RegisterSeleniumElementTimeout(context);
            RegisterHearingServices(context);
            RegisterSauceLabsSettings(context);
            RunningServiceWebLocally(context);
            await GenerateBearerTokens(context);
        }

        private void RegisterAzureSecrets(TestContext context)
        {
            context.WebConfig.AzureAdConfiguration = Options.Create(_configRoot.GetSection("AzureAd").Get<SecuritySettings>()).Value;
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

        private static void RegisterDefaultData(TestContext context)
        {
            context.Test = new Test {Answers = new List<SuitabilityAnswer>()};
        }

        private void RegisterIsLive(TestContext context)
        {
            context.WebConfig.IsLive = _configRoot.GetValue<bool>("IsLive");
            context.WebConfig.Should().NotBeNull();
        }

        private void RegisterSeleniumElementTimeout(TestContext context)
        {
            context.WebConfig.SeleniumElementTimeout = _configRoot.GetValue<int>("SeleniumElementTimeout");
        }

        private void RegisterHearingServices(TestContext context)
        {
            context.WebConfig.VhServices = GetTargetTestEnvironment() == string.Empty ? Options.Create(_configRoot.GetSection("VhServices").Get<ServiceWebVhServicesConfig>()).Value
                : Options.Create(_configRoot.GetSection($"Testing.{GetTargetTestEnvironment()}.VhServices").Get<ServiceWebVhServicesConfig>()).Value;
            if (context.WebConfig.VhServices == null && GetTargetTestEnvironment() != string.Empty) throw new TestSecretsFileMissingException(GetTargetTestEnvironment());
            ConfigurationManager.VerifyConfigValuesSet(context.WebConfig.VhServices);
        }

        private void RegisterSauceLabsSettings(TestContext context)
        {
            context.WebConfig.SauceLabsConfiguration = RunOnSauceLabsFromLocal() ?  Options.Create(_configRoot.GetSection("LocalSaucelabs").Get<SauceLabsSettingsConfig>()).Value
                : Options.Create(_configRoot.GetSection("Saucelabs").Get<SauceLabsSettingsConfig>()).Value;
            if (!context.WebConfig.SauceLabsConfiguration.RunningOnSauceLabs()) return;
            context.WebConfig.SauceLabsConfiguration.SetRemoteServerUrlForDesktop(context.WebConfig.TestConfig.CommonData.CommonConfig.SauceLabsServerUrl);
            context.WebConfig.SauceLabsConfiguration.AccessKey.Should().NotBeNullOrWhiteSpace();
            context.WebConfig.SauceLabsConfiguration.Username.Should().NotBeNullOrWhiteSpace();
            context.WebConfig.SauceLabsConfiguration.RealDeviceApiKey.Should().NotBeNullOrWhiteSpace();
        }

        private static string GetTargetTestEnvironment()
        {
            return NUnit.Framework.TestContext.Parameters["TargetTestEnvironment"] ?? string.Empty;
        }

        private static bool RunOnSauceLabsFromLocal()
        {
            return NUnit.Framework.TestContext.Parameters["RunOnSauceLabs"] != null &&
                   NUnit.Framework.TestContext.Parameters["RunOnSauceLabs"].Equals("true");
        }

        private static void RunningServiceWebLocally(TestContext context)
        {
            context.WebConfig.VhServices.RunningServiceWebLocally = context.WebConfig.VhServices.ServiceWebUrl.Contains("localhost");
        }

        private static async Task GenerateBearerTokens(TestContext context)
        {
            var tokenProvider = new TokenProvider(Options.Create(context.WebConfig.AzureAdConfiguration));
            context.TestApiBearerToken = await tokenProvider.GetClientAccessToken(context.WebConfig.AzureAdConfiguration.ClientId, context.WebConfig.AzureAdConfiguration.ClientSecret, context.WebConfig.VhServices.TestApiResourceId);
            context.TestApiBearerToken.Should().NotBeNullOrEmpty();
        }
    }
}
