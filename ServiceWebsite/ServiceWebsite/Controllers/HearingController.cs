using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using ServiceWebsite.Common;
using ServiceWebsite.Services;

namespace ServiceWebsite.Controllers
{
    [Route("/api/hearings/")]
    [Authorize]
    public class HearingsController : Controller
    {
        private readonly IHearingsService _hearings;

        public HearingsController(IHearingsService participants)
        {
            _hearings = participants;
        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetHearing(string id)
        {
            try
            {
                var hearing = await _hearings.GetHearingFor(User.Identity.Name, id);
                return Ok(hearing);
            }
            catch (NotFoundException e)
            {
                ApplicationLogger.TraceException(TraceCategories.MissingResource, "Missing hearing for user", e, User);
                return NotFound($"No hearing with id '{id}' found for user");
            }
        }

        [HttpGet("next")]
        public async Task<IActionResult> GetNextHearing()
        {
            var hearings = await _hearings.GetHearingsFor(User.Identity.Name);
            var hearing = hearings.FirstOrDefault();
            if (hearing == null) {
                return NotFound($"No upcoming hearings for user [{User.Identity.Name}]");
            }

            var settings = new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };

            return Json(hearing,settings);
        }
    }
}