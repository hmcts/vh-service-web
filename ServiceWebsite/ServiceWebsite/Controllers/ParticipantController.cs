using System;
using System.Collections.Generic;
using System.Net;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceWebsite.Common;
using ServiceWebsite.Domain;
using ServiceWebsite.Models;
using ServiceWebsite.Models.Mappings;
using ServiceWebsite.Services;
using Swashbuckle.AspNetCore.Annotations;

namespace ServiceWebsite.Controllers
{
    [Produces("application/json")]
    [Route("/api/hearings/")]
    [Authorize]
    public class ParticipantController : Controller
    {
        private readonly IHearingsService _hearingService;
        private readonly IParticipantService _participantService;
        private static readonly string strRegex = @"\b[A-Z]+(?:_[A-Z]+)+\b";
        private static readonly Regex validAnswerKeyRegex = new Regex(strRegex, RegexOptions.Compiled);
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
            try
            {
                var participantId = await _hearingService.GetParticipantIdAsync(User.Identity.Name, hearingId);

                if (!participantId.HasValue)
                {
                    return new UnauthorizedObjectResult($"User is not a participant of hearing with id '{hearingId}'");
                }
                
                if (answers.Count == 0)
                {
                    return new BadRequestObjectResult($"Please provide valid answers");
                }
                else
                {
                    foreach (HearingSuitabilityAnswer answer in answers)
                    {
                        bool isValid = ValidateAnswerKey(answer.QuestionKey);
                        if (!isValid)
                        {
                            return new BadRequestObjectResult($"Please provide a valid answer key");
                        }
                    }
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

        private List<SuitabilityAnswer> MapAnswers(List<HearingSuitabilityAnswer> answers)
        {
            List<SuitabilityAnswer> suitabilityAnswers = new List<SuitabilityAnswer>();
            foreach (HearingSuitabilityAnswer answer in answers)
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

        private bool ValidateAnswerKey(string answerKey)
        {
            Match match = validAnswerKeyRegex.Match(answerKey);

            return match.Success;
        }

    }


}
