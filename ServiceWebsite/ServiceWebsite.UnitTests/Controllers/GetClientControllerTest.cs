using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using NUnit.Framework;
using ServiceWebsite.Common.Configuration;
using ServiceWebsite.Configuration;
using ServiceWebsite.Controllers;
using ServiceWebsite.Models;

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
            var config = result.As<JsonResult>().Value;
            config.Should().BeOfType(typeof(ClientConfiguration));
            var clientConfig = config as ClientConfiguration;
            clientConfig.PexipSelfTestNodeUri.Should().Be("PexipSelfTestNodeUri");
            clientConfig.BaseVideoUrl.Should().Be("BaseVideoUrl");
            clientConfig.PostLogoutRedirectUri.Should().Be("PostLogoutRedirectUri");
            clientConfig.AppInsightsInstrumentationKey.Should().Be("AppInsightsKey");
            clientConfig.TenantId.Should().Be("TenantId");
            clientConfig.ClientId.Should().Be("ClientId");
            clientConfig.RedirectUri.Should().Be("RedirectUri");
            clientConfig.VideoAppUrl.Should().Be("VideoWebUrl");
            clientConfig.KinlySelfTestScoreEndpointUrl.Should().Be("KinlySelfTestScoreEndpointUrl");
        }
    }
}
