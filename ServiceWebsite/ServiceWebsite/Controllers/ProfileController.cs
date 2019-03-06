using System;
using System.Threading.Tasks;
using Hearings.Common;
using Hearings.Common.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceWebsite.Common;
using ServiceWebsite.Services;

namespace ServiceWebsite.Controllers
{
    [Route("/api/profile")]
    [Authorize]
    public class ProfileController : Controller
    {
        private readonly IParticipantService _participantService;

        public ProfileController(IParticipantService participantService)
        {
            _participantService = participantService;
        }
        
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            try
            {
                var participant = await _participantService.FindParticipant(User.Identity.Name);
                var profile = new
                {
                    participant.Email,
                    participant.Role
                };

                return Json(profile);
            }
            catch (NotFoundException e)
            {
                // If we can't find the user, or it hasn't got any upcoming hearings, it shouldn't be deemed as authorized
                ApplicationLogger.TraceException(TraceCategories.Authorization, $"Failed to find participant: [{User.Identity.Name}]", e, User);
                return Unauthorized();
            }
        }
    }
}