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
        private readonly ServiceSettings _serviceSettings;
        private readonly SecuritySettings _securitySettings;

        /// <summary>
        /// Config controller
        /// </summary>
        /// <param name="serviceSettings"></param>
        /// <param name="securitySettings"></param>
        public ConfigController(IOptions<ServiceSettings> serviceSettings, IOptions<SecuritySettings> securitySettings)
        {
            _serviceSettings = serviceSettings.Value;
            _securitySettings = securitySettings.Value;
        }

        /// <summary>
        /// Get configuration
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetConfiguration()
        {
            var config = new ClientConfiguration
            {
                VideoAppUrl = _serviceSettings.VideoWebUrl,
                AppInsightsInstrumentationKey = _securitySettings.AppInsightsKey,
                TenantId = _securitySettings.TenantId,
                ClientId = _securitySettings.ClientId,
                RedirectUri = _securitySettings.RedirectUri,
                PostLogoutRedirectUri = _securitySettings.PostLogoutRedirectUri,
                BaseVideoUrl = _securitySettings.BaseVideoUrl,
                PexipSelfTestNodeUri = _serviceSettings.PexipSelfTestNodeUri,
                KinlySelfTestScoreEndpointUrl = _serviceSettings.KinlySelfTestScoreEndpointUrl
            };

            return Json(config);
        }
    }
}