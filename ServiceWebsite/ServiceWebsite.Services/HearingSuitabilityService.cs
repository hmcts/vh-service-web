using ServiceWebsite.BookingsAPI.Client;
using ServiceWebsite.Domain;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServiceWebsite.Services
{
    public class HearingSuitabilityService : IHearingSuitabilityService
    {
        private readonly IBookingsApiClient _bookingsApiClient;

        public HearingSuitabilityService(IBookingsApiClient bookingsApiClient)
        {
            _bookingsApiClient = bookingsApiClient;
        }

        public async Task<List<HearingSuitability>> GetHearingsSuitability(string username)
        {
            return (await _bookingsApiClient.GetPersonSuitabilityAnswersAsync(username))
                .Select(CreateModel)
                .ToList();
        }

        private static HearingSuitability CreateModel(PersonSuitabilityAnswerResponse response)
        {
            var answers = response.Answers.Select(CreateModel);

            return new HearingSuitability
            (
                response.Hearing_id.GetValueOrDefault(),
                response.Participant_id.GetValueOrDefault(),
                response.Scheduled_at.GetValueOrDefault(),
                response.Questionnaire_not_required.GetValueOrDefault(),
                answers
            );
        }

        private static SuitabilityAnswer CreateModel(SuitabilityAnswerResponse response)
        {
            return new SuitabilityAnswer
            {
                Answer = response.Answer,
                ExtendedAnswer = response.Extended_answer,
                QuestionKey = response.Key
            };
        }
    }
}