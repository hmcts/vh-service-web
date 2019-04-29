using System;
using System.Collections.Generic;

namespace ServiceWebsite.Models
{
    /// <summary>
    /// The answers submitted thus far for a given hearing and participant
    /// </summary>
    public class HearingSuitabilityResponse
    {
        /// <summary>
        /// Id for the hearing the answers have been or should be submitted for
        /// </summary>
        public Guid HearingId { get; set; }
        
        /// <summary>
        /// When the hearing is scheduled at
        /// </summary>
        public DateTime HearingScheduledAt { get; set; }
        
        /// <summary>
        /// A list of answers, will be empty before any answers have been submitted
        /// </summary>
        public List<HearingSuitabilityAnswer> Answers { get; set; }
    }
}