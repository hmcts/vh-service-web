using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using ServiceWebsite.Models;
using ServiceWebsite.Security;

namespace ServiceWebsite.Controllers
{
    [Route("/api/config")]
    public class ConfigController : Controller
    {
        private readonly EnvironmentSettings _settings;

        public ConfigController(IOptions<EnvironmentSettings> settings)
        {
            _settings = settings.Value;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetConfiguration()
        {
            var baseUrl = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";

            var config = new ClientConfiguration
            {
                VideoAppUrl = _settings.VideoAppUrl,
                AppInsightsInstrumentationKey = _settings.AppInsightsKey,
                TenantId = _settings.TenantId,
                ClientId = _settings.ClientId,
                RedirectUri = $"{baseUrl}/login",
                PostLogoutRedirectUri = $"{baseUrl}/",
                BaseVideoUrl = _settings.BaseVideoUrl
            };

            return Json(config);
        }
    }
}