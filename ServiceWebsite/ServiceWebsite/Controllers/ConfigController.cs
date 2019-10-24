using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using ServiceWebsite.Configuration;
using ServiceWebsite.Models;

namespace ServiceWebsite.Controllers
{
    [Route("/api/config")]
    public class ConfigController : Controller
    {
        private readonly EnvironmentSettings _settings;
        private readonly ServiceSettings _serviceSettings;

        public ConfigController(IOptions<EnvironmentSettings> settings, IOptions<ServiceSettings> serviceSettings)
        {
            _settings = settings.Value;
            _serviceSettings = serviceSettings.Value;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetConfiguration()
        {
            var config = new ClientConfiguration
            {
                VideoAppUrl = _settings.VideoAppUrl,
                AppInsightsInstrumentationKey = _settings.AppInsightsKey,
                TenantId = _settings.TenantId,
                ClientId = _settings.ClientId,
                RedirectUri = _settings.RedirectUri,
                PostLogoutRedirectUri = _settings.PostLogoutRedirectUri,
                BaseVideoUrl = _settings.BaseVideoUrl,
                PexipSelfTestNodeUri = _serviceSettings.PexipSelfTestNodeUri,
                KinlySelfTestScoreEndpointUrl = _serviceSettings.KinlySelfTestScoreEndpointUrl
            };

            return Json(config);
        }
    }
}