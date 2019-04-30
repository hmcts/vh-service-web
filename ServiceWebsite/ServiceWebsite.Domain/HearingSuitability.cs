using System;
using System.Collections.Generic;
using System.Linq;

namespace ServiceWebsite.Domain
{
    public class HearingSuitability
    {
        public HearingSuitability(Guid hearingId, DateTime hearingScheduledAt, IEnumerable<SuitabilityAnswer> answers = null)
        {
            HearingId = hearingId;
            HearingScheduledAt = hearingScheduledAt;
            Answers = (answers ?? Enumerable.Empty<SuitabilityAnswer>()).ToList();
        }
        
        public Guid HearingId { get; }

        public DateTime HearingScheduledAt { get; }
        
        public List<SuitabilityAnswer> Answers { get; }
    }
}