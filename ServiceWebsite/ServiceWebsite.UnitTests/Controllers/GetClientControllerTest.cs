using FluentAssertions;
using Microsoft.Extensions.Options;
using NUnit.Framework;
using ServiceWebsite.Configuration;
using ServiceWebsite.Controllers;

namespace ServiceWebsite.UnitTests.Controllers
{
    public class GetClientConfigurationSettingsTests
    {
        [Test]
        public void Should_return_response_with_settings()
        {
            var securitySettings = new SecuritySettings
            {
                ClientId = "ClientId",
                TenantId = "TenantId",
                ClientSecret = "ClientSecret",
                Authority = "Authority",
                AppInsightsKey = "AppInsightsKey",
                BaseVideoUrl = "BaseVideoUrl",
                PostLogoutRedirectUri = "PostLogoutRedirectUri",
                RedirectUri = "RedirectUri",
                UserApiClientId = "UserApiClientId",
                UserApiClientSecret = "UserApiClientSecret"
            };

            var serviceSettings = new ServiceSettings
            {
                BookingsApiResourceId = "BookingsApiResourceId",
                BookingsApiUrl = "BookingsApiUrl",
                KinlySelfTestScoreEndpointUrl = "KinlySelfTestScoreEndpointUrl",
                PexipSelfTestNodeUri = "PexipSelfTestNodeUri",
                UserApiResourceId = "UserApiResourceId",
                UserApiUrl = "UserApiUrl",
                VideoWebUrl = "VideoWebUrl"
            };

            var configSettingsController = new ConfigController(Options.Create(serviceSettings), Options.Create(securitySettings));

            var result = configSettingsController.GetConfiguration();
            result.Should().NotBeNull();
        }
    }
}
