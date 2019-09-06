using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceWebsite.Common;
using ServiceWebsite.Models;
using ServiceWebsite.UserAPI.Client;
using Swashbuckle.AspNetCore.Annotations;

namespace ServiceWebsite.Controllers
{
    [Produces("application/json")]
    [Route("/api/profile")]
    [Authorize]
    public class ProfileController : Controller
    {
        private readonly IUserApiClient _userApiClient;

        public ProfileController(IUserApiClient userApiClient)
        {
            _userApiClient = userApiClient;
        }
        
        [HttpGet]
        [SwaggerOperation(OperationId = "GetUserProfile")]
        [ProducesResponseType(typeof(UserProfileResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetUserProfile()
        {
            try
            {
                var participant = await _userApiClient.GetUserByAdUserNameAsync(User.Identity.Name);

                return Ok(new UserProfileResponse{ Email = participant.Email, Role = participant.User_role });
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