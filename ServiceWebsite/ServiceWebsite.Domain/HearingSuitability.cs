using System;
using System.Collections.Generic;
using System.Linq;

namespace ServiceWebsite.Domain
{
    public class HearingSuitability
    {
        public HearingSuitability(Guid hearingId, Guid participantId, DateTime hearingScheduledAt, bool questionnaireNotRequired, IEnumerable<SuitabilityAnswer> answers = null)
        {
            HearingId = hearingId;
            ParticipantId = participantId;
            HearingScheduledAt = hearingScheduledAt;
            QuestionnaireNotRequired = questionnaireNotRequired;
            Answers = (answers ?? Enumerable.Empty<SuitabilityAnswer>()).ToList();
        }
        
        public Guid HearingId { get; }
        public Guid ParticipantId { get; }
        public DateTime HearingScheduledAt { get; }
        public bool QuestionnaireNotRequired { get; set; }
        public List<SuitabilityAnswer> Answers { get; }
    }
}