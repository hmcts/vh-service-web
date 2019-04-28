using System;
using System.Threading.Tasks;
using Hearings.Common;
using Hearings.Common.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceWebsite.Common;
using ServiceWebsite.Models.Mappings;
using ServiceWebsite.Services;
using ServiceWebsite.UserAPI.Client;

namespace ServiceWebsite.Controllers
{
    [Route("/api/profile")]
    [Authorize]
    public class ProfileController : Controller
    {
        private readonly IUserApiClient _userApiClient;
        private readonly IHearingSuitabilityService _hearingSuitabilityClient;

        public ProfileController(IUserApiClient userApiClient, IHearingSuitabilityService hearingSuitabilityClient)
        {
            _userApiClient = userApiClient;
            _hearingSuitabilityClient = hearingSuitabilityClient;
        }
        
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            try
            {
                var participant = await _userApiClient.GetUserByAdUserNameAsync(User.Identity.Name);
                
                var profile = new
                {
                    participant.Email,
                    Role = participant.User_role
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