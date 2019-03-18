using System;
using System.Collections.Generic;
using System.Text;

namespace ServiceWebsite.UnitTests.Response
{
    /// <summary>
    ///     Participant current status response
    /// </summary>
    public class ParticipantStatusResponse
    {
        /// <summary>
        ///     Gets or sets the ID.
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        ///     Gets or sets the hearing Id.
        /// </summary>
        public long HearingId { get; set; }

        /// <summary>
        ///     Gets or sets the participant Id.
        /// </summary>
        public long ParticipantId { get; set; }

        /// <summary>
        ///     Gets or sets the current status Id.
        /// </summary>
        public int StatusId { get; set; }

        /// <summary>
        ///     Gets or sets the current status.
        /// </summary>
        public string StatusName { get; set; }

        /// <summary>
        ///     Gets or sets the current status additional info.
        /// </summary>
        public string AdditionalInfo { get; set; }

        /// <summary>
        ///     Gets or sets the created date and time of status.
        /// </summary>
        public DateTime CreatedDate { get; set; }
    }
}
