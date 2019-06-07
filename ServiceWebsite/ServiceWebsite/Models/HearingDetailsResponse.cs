using System;

namespace ServiceWebsite.Models
{
    /// <summary>
    /// Details for a hearing
    /// </summary>
    public class HearingDetailsResponse
    {
        /// <summary>
        /// The hearing lead case name
        /// </summary>
        public string CaseName { get; set; }
        
        /// <summary>
        /// The hearing lead case number
        /// </summary>
        public string CaseNumber { get; set; }

        /// <summary>
        /// Time and date the hearing is scheduled for
        /// </summary>
        public DateTime ScheduledDateTime { get; set; }
    }
}