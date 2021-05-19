using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceWebsite.Models;
using ServiceWebsite.Models.Mappings;
using ServiceWebsite.Services;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace ServiceWebsite.Controllers
{
    [Authorize]
    [Route("/api/hearing-suitability")]
    public class HearingSuitabilityController : Controller
    {
        private readonly IHearingSuitabilityService _suitabilityService;

        public HearingSuitabilityController(IHearingSuitabilityService suitabilityService)
        {
            _suitabilityService = suitabilityService;
        }

        [HttpGet]
        [ActionName("GetHearingSuitabilityAnswers")]
        [ProducesResponseType(typeof(List<HearingSuitabilityResponse>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetUserSuitabilityAnswers()
        {
            var hearings = await _suitabilityService.GetHearingsSuitability(User.Claims.FirstOrDefault(c => c.Type == "preferred_username")?.Value);

            return Ok(SuitabilityAnswersMapping.Map(hearings));
        }
    }
}