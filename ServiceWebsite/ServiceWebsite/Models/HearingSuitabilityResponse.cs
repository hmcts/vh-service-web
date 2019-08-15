using System;
using System.Collections.Generic;

namespace ServiceWebsite.Models
{
    public class HearingSuitabilityResponse
    {
        public Guid HearingId { get; set; }
        public DateTime HearingScheduledAt { get; set; }
        public bool QuestionnaireNotRequired { get; set; }
        public List<HearingSuitabilityAnswer> Answers { get; set; }
    }
}