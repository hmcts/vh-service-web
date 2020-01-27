using System;
using System.Collections.Generic;

namespace ServiceWebsite.UnitTests.Response
{
    /// <summary>
    ///     A hearing
    /// </summary>
    public class HearingResponse
    {
        /// <summary>
        ///     List of cases associated to the hearing
        /// </summary>
        public List<CaseResponse> Cases { get; set; }

        /// <summary>
        ///     The date and time for a hearing
        /// </summary>
        public DateTime ScheduledDateTime { get; set; }

        /// <summary>
        ///     The duration of a hearing (number of minutes)
        /// </summary>
        public int ScheduledDuration { get; set; }

        /// <summary>
        ///     The type of hearing (e.g. Tax, Divorce)
        /// </summary>
        public string HearingType { get; set; }

        /// <summary>
        ///     The medium over which the hearing will be conducted (e.g. Video, Audio, Mixed)
        /// </summary>
        public string HearingMedium { get; set; }

        /// <summary>
        /// The hearing status (e.g. Created, Live). 
        /// </summary>
        public string Status { get; set; }

        /// <summary>
        /// The unique identifier for the hearing.
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        ///     The meeting Url for the video hearing
        /// </summary>
        public string MeetingUrl { get; set; }

        /// <summary>
        ///     The joining Url for the video hearing
        /// </summary>
        public string JoiningUrl { get; set; }

        /// <summary>
        ///     The expiry time for the meeting url
        /// </summary>
        public DateTime? MeetingUrlExpiryTime { get; set; }

        /// <summary>
        /// List of participants associated with hearing
        /// </summary>
        public List<ParticipantResponse> Participants { get; set; }

        /// <summary>
        /// Court 
        /// </summary>
        public CourtResponse Court { get; set; }
    }
}
