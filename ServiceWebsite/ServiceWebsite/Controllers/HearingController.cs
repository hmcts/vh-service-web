using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceWebsite.Common;
using ServiceWebsite.Domain;
using ServiceWebsite.Models;
using ServiceWebsite.Services;
using Swashbuckle.AspNetCore.Annotations;

namespace ServiceWebsite.Controllers
{
    [Produces("application/json")]
    [Route("/api/hearings/")]
    [Authorize]
    public class HearingsController : Controller
    {
        private readonly IHearingsService _hearings;

        public HearingsController(IHearingsService participants)
        {
            _hearings = participants;
        }
        
        /// <summary>
        /// Return details for a hearing booked for the current user
        /// </summary>
        /// <param name="id">Id of the hearing to get details for</param>
        [HttpGet("{id}")]
        [SwaggerOperation(OperationId="GetHearingById")]
        [ProducesResponseType(typeof(HearingDetailsResponse), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> GetHearing(Guid id)
        {
            try
            {
                var hearing = await _hearings.GetHearingFor(User.Identity.Name, id);
                var response = MapDetails(hearing);
                return Ok(response);
            }
            catch (NotFoundException e)
            {
                ApplicationLogger.TraceException(TraceCategories.MissingResource, "Missing hearing for user", e, User);
                return NotFound($"No hearing with id '{id}' found for user");
            }
            catch (UnauthorizedAccessException e)
            {
                ApplicationLogger.TraceException(TraceCategories.Authorization, "Not participant of hearing", e, User);
                return new UnauthorizedObjectResult($"User is not a participant of hearing with id '{id}'");
            }
        }

        private static HearingDetailsResponse MapDetails(Hearing hearing)
        {
            return new HearingDetailsResponse
            {
                CaseName = hearing.CaseName,
                CaseNumber = hearing.CaseNumber,
                ScheduledDateTime = hearing.ScheduledDateTime
            };
        }
    }
}
