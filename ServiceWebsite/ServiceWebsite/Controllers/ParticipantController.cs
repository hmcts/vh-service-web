using System;
using System.Collections.Generic;
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
    public class ParticipantController : Controller
    {
        public ParticipantController()
        {
        }
        
        /// <summary>
        /// Update Suitability answers
        /// </summary>
        /// <param name="hearingId">Hearing Id</param>
        /// <param name="answers">List of Suitability Answers</param>
        /// <returns></returns>
        [HttpPut("{hearingId}")]
        [SwaggerOperation(OperationId = "UpdateSuitabilityAnswers")]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.NoContent)]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> UpdateSuitabilityAnswers(Guid hearingId, [FromBody]List<HearingSuitabilityAnswer> answers)
        {
          await Task.Yield();
          return NoContent();
        }
    }
}
