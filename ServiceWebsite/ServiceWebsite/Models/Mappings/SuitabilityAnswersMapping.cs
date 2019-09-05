using ServiceWebsite.Domain;
using System.Collections.Generic;
using System.Linq;

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
                ParticipantId = suitability.ParticipantId,
                HearingScheduledAt = suitability.HearingScheduledAt,
                QuestionnaireNotRequired = suitability.QuestionnaireNotRequired,
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