using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceWebsite.Common;
using ServiceWebsite.Domain;
using ServiceWebsite.Models;
using ServiceWebsite.Services;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ServiceWebsite.Controllers
{
    [Produces("application/json")]
    [Route("/api/hearings/")]
    [Authorize]
    public class ParticipantController : Controller
    {
        private readonly IHearingsService _hearingService;
        private readonly IParticipantService _participantService;
        private static readonly string strRegex = @"(\b[A-Z]+(?:_[A-Z]+)+\b)|(\b[A-Z]+\b)";
        private static readonly Regex ValidAnswerKeyRegex = new Regex(strRegex, RegexOptions.Compiled);
        public ParticipantController(IHearingsService hearingsService, IParticipantService participantService)
        {
            _hearingService = hearingsService;
            _participantService = participantService;
        }

        /// <summary>
        /// Update Suitability answers
        /// </summary>
        /// <param name="hearingId">Hearing Id</param>
        /// <param name="answers">List of Suitability Answers</param>
        /// <returns></returns>
        [HttpPut("{hearingId}")]
        [SwaggerOperation(OperationId = "UpdateSuitabilityAnswers")]
        [ProducesResponseType((int)HttpStatusCode.NoContent)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> UpdateSuitabilityAnswers(Guid hearingId, [FromBody]List<HearingSuitabilityAnswer> answers)
        {
            if (hearingId == Guid.Empty)
            {
                return new BadRequestObjectResult($"Please provide a valid hearing id");
            }

            if (answers.Count == 0)
            {
                return new BadRequestObjectResult($"Please provide valid answers");
            }

            foreach (var answer in answers)
            {
                if (!ValidateAnswerKey(answer.QuestionKey))
                {
                    return new BadRequestObjectResult($"Please provide a valid answer key");
                }
            }

            try
            {
                var participantId = await _hearingService.GetParticipantIdAsync(User.Identity.Name, hearingId);

                if (!participantId.HasValue)
                {
                    return new UnauthorizedObjectResult($"User is not a participant of hearing with id '{hearingId}'");
                }

                var suitabilityAnswers = MapAnswers(answers);
                await _participantService.UpdateSuitabilityAnswers(hearingId, participantId.Value, suitabilityAnswers);

                return NoContent();
            }
            catch (NotFoundException e)
            {
                ApplicationLogger.TraceException(TraceCategories.MissingResource, e.Message, e, User);
                return NotFound(e.Message);
            }
            catch (UnauthorizedAccessException e)
            {
                ApplicationLogger.TraceException(TraceCategories.Authorization, "Not participant of hearing", e, User);
                return new UnauthorizedObjectResult($"User is not a participant of hearing with id '{hearingId}'");
            }
        }

        [HttpGet("participants")]
        [AllowAnonymous] // TODO remove
        [SwaggerOperation(OperationId = "GetParticipantsByUsername")]
        [ProducesResponseType(typeof(ParticipantResponse), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int) HttpStatusCode.NotFound)]
        [ProducesResponseType((int) HttpStatusCode.BadRequest)]
        public async Task<IActionResult> GetParticipantsByUsername()
        {
            var username = User.Identity.Name;
            if(string.IsNullOrWhiteSpace(username))
            {
                ModelState.AddModelError("username", $"The username is invalid: {username}");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var participants = (await _participantService.GetParticipantsByUsernameAsync(username)).ToList();

            if (participants.Count == 0)
            {
                return NotFound();
            }

            var firstParticipant = participants.First();

            return Ok(new ParticipantResponse { Id = firstParticipant.Id, Username = firstParticipant.Username });
        }

        private static List<SuitabilityAnswer> MapAnswers(IEnumerable<HearingSuitabilityAnswer> answers)
        {
            var suitabilityAnswers = new List<SuitabilityAnswer>();

            foreach (var answer in answers)
            {
                suitabilityAnswers.Add(new SuitabilityAnswer
                {
                    QuestionKey = answer.QuestionKey,
                    Answer = answer.Answer,
                    ExtendedAnswer = answer.ExtendedAnswer
                });
            }
            return suitabilityAnswers;
        }

        private static bool ValidateAnswerKey(string answerKey)
        {
            return ValidAnswerKeyRegex.Match(answerKey).Success;
        }
    }
}
