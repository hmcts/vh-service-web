using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceWebsite.Common;
using ServiceWebsite.Models;
using ServiceWebsite.UserAPI.Client;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

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

                return Ok(new UserProfileResponse { Email = participant.Email, Role = participant.User_role });
            }
            catch (UserApiException ex) when (ex.StatusCode == (int)HttpStatusCode.NotFound)
            {
                var userAdObjectId = User.Claims.FirstOrDefault(m => m.Type == "oid");
                ApplicationLogger.TraceException
                (
                    TraceCategories.MissingResource,
                    $"Failed call to GetUserProfile(): [{(userAdObjectId != null ? userAdObjectId.Value : "unknown")}]",
                    ex,
                    User
                );

                return NotFound();
            }
            catch (UserApiException ex) when (ex.StatusCode == (int)HttpStatusCode.Unauthorized)
            {
                ApplicationLogger.TraceException
                (
                    TraceCategories.Authorization,
                    "Unauthorized call to GetUserProfile()",
                    ex,
                    User
                );

                return Unauthorized(ex.Message);
            }
            catch (UserApiException ex)
            {
                ApplicationLogger.TraceException
                (
                    TraceCategories.Unhandled,
                    $"Failed call to GetUserProfile(): [{ex.Message}]",
                    ex,
                    User
                );

                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
            catch (Exception ex)
            {
                ApplicationLogger.TraceException
                (
                    TraceCategories.Unhandled,
                    "Failed call to GetUserProfile()",
                    ex,
                    User
                );

                throw;
            }
        }
    }
}