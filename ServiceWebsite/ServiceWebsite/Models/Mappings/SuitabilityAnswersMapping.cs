using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ServiceWebsite.BookingsAPI.Client;
using ServiceWebsite.Domain;

namespace ServiceWebsite.Models.Mappings
{
    public static class SuitabilityAnswersMapping
    {
        public static List<HearingSuitabilityResponse> Map(List<HearingSuitability> hearings)
        {
            return hearings.Select(Map).ToList();
        }

        private static HearingSuitabilityResponse Map(HearingSuitability suitability)
        {
            return new HearingSuitabilityResponse
            {
                HearingId = suitability.HearingId,
                HearingScheduledAt = suitability.HearingScheduledAt,
                Answers = suitability.Answers.Select(Map).ToList()
            };
        }

        private static HearingSuitabilityAnswer Map(SuitabilityAnswer answer)
        {
            return new HearingSuitabilityAnswer
            {
                QuestionKey = answer.QuestionKey,
                Answer = answer.Answer,
                ExtendedAnswer = answer.ExtendedAnswer
            };
        }
    }
}