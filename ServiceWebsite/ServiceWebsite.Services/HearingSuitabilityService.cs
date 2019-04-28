using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ServiceWebsite.BookingsAPI.Client;
using ServiceWebsite.Domain;

namespace ServiceWebsite.Services
{
    public class HearingSuitabilityService : IHearingSuitabilityService
    {
        private readonly IPastHearing _pastHearing;
        private readonly IBookingsApiClient _bookingsApiClient;

        public HearingSuitabilityService(IPastHearing pastHearing, IBookingsApiClient bookingsApiClient)
        {
            _pastHearing = pastHearing;
            _bookingsApiClient = bookingsApiClient;
        }

        public async Task<List<HearingSuitability>> GetUpcomingHearingsSuitability(string username)
        {
            var suitabilityAnswers = await _bookingsApiClient.GetPersonSuitabilityAnswersAsync(username);
            return suitabilityAnswers.Where(IsUpcomingHearing).Select(CreateModel).ToList();
        }

        private bool IsUpcomingHearing(PersonSuitabilityAnswerResponse hearing)
        {
            return !_pastHearing.IsPast(hearing.Scheduled_at.GetValueOrDefault());
        }

        private static HearingSuitability CreateModel(PersonSuitabilityAnswerResponse response)
        {
            var answers = response.Answers.Select(CreateModel);
            return new HearingSuitability(response.Hearing_id.GetValueOrDefault(), response.Scheduled_at.GetValueOrDefault(), answers);
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