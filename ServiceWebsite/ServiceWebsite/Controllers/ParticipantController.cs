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
        private readonly IKinlyPlatformService _kinlyPlatformService;
        private readonly IPollyRetryService _pollyRetryService;
        private const string StrRegex = @"(\b[A-Z]+(?:_[A-Z]+)+\b)|(\b[A-Z]+\b)";
        private static readonly Regex ValidAnswerKeyRegex = new Regex(StrRegex, RegexOptions.Compiled);
        public ParticipantController(IHearingsService hearingsService, IParticipantService participantService, IKinlyPlatformService kinlyPlatformService,
            IPollyRetryService pollyRetryService)
        {
            _hearingService = hearingsService;
            _participantService = participantService;
            _kinlyPlatformService = kinlyPlatformService;
            _pollyRetryService = pollyRetryService;
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

        [HttpGet("participants/current")]
        [SwaggerOperation(OperationId = "GetCurrentParticipant")]
        [ProducesResponseType(typeof(ParticipantResponse), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> GetCurrentParticipant()
        {
            var participants = (await _participantService.GetParticipantsByUsernameAsync(User.Identity.Name)).ToList();

            if (participants.Count == 0)
            {
                return NotFound();
            }

            var firstParticipant = participants.First();

            return Ok(new ParticipantResponse { Id = firstParticipant.Id, Username = firstParticipant.Username });
        }

        [HttpGet("participants/{participantId}/selftestresult")]
        [SwaggerOperation(OperationId = "GetTestCallResult")]
        [ProducesResponseType(typeof(TestCallScoreResponse), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(TestCallScoreResponse), (int)HttpStatusCode.NotFound)]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> GetTestCallResultForParticipant(Guid participantId)
        {
            try
            {
                var score = await _pollyRetryService.WaitAndRetryAsync<NotFoundException, TestCallResult>
                (
                    2, x => TimeSpan.FromSeconds(5 * x), null, 
                    () => _kinlyPlatformService.GetTestCallScoreAsync(participantId)
                );

                return Ok(score);
            }
            catch (NotFoundException e)
            {
                ApplicationLogger.TraceException(TraceCategories.MissingResource, "Missing test score for participant", e, User, new Dictionary<string, string>{ { "participantId", participantId.ToString() } });
                return NotFound($"No test score result found for participant Id: {participantId}");
            }
            catch(Exception ex)
            {
                ApplicationLogger.TraceException(TraceCategories.MissingResource, "Missing test score for participant", ex, User, new Dictionary<string, string> { { "participantId", participantId.ToString() } });
                return NotFound($"No test score result found for participant Id: {participantId}");
            }
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
