using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceWebsite.Models.Mappings;
using ServiceWebsite.Security;
using ServiceWebsite.Services;

namespace ServiceWebsite.Controllers
{
    [Route("/api/hearing-suitability")]
    [Authorize]
    public class HearingSuitabilityController : Controller
    {
        private readonly ICurrentUser _userIdentity;
        private readonly IHearingSuitabilityService _suitabilityService;

        public HearingSuitabilityController(ICurrentUser userIdentity,
            IHearingSuitabilityService suitabilityService)
        {
            _userIdentity = userIdentity;
            _suitabilityService = suitabilityService;
        }
        
        [HttpGet]
        [ActionName("GetUpcomingHearingSuitabilityAnswers")]
        public async Task<IActionResult> GetUserSuitabilityAnswers()
        {
            var hearings = await _suitabilityService.GetUpcomingHearingsSuitability(_userIdentity.Username);
            return Ok(SuitabilityAnswersMapping.Map(hearings));
        }
    }
}