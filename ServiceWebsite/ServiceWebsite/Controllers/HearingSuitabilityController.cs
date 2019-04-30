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
        private readonly IHearingSuitabilityService _suitabilityService;

        public HearingSuitabilityController(IHearingSuitabilityService suitabilityService)
        {
            _suitabilityService = suitabilityService;
        }
        
        [HttpGet]
        [ActionName("GetHearingSuitabilityAnswers")]
        public async Task<IActionResult> GetUserSuitabilityAnswers()
        {
            var hearings = await _suitabilityService.GetHearingsSuitability(User.Identity.Name);
            return Ok(SuitabilityAnswersMapping.Map(hearings));
        }
    }
}