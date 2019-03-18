using System;
using System.Collections.Generic;
using System.Text;

namespace ServiceWebsite.UnitTests.Response
{
    /// <summary>
    ///     Notification for a participant in a hearing
    /// </summary>
    public class ParticipantNotificationResponse
    {
        /// <summary>
        ///     Unique identified for the notification
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        ///     Type of event that occured or notification that was raised
        /// </summary>
        public string NotificationType { get; set; }

        /// <summary>
        ///     Data stored for the notification
        /// </summary>
        public string LogInformation { get; set; }

        /// <summary>
        ///     Whether the notification/event was successful or not
        /// </summary>
        public string Result { get; set; }

        /// <summary>
        ///     Time the notification was created
        /// </summary>
        public DateTime CreateTime { get; set; }

        /// <summary>
        ///     If the notification has been seen by administrators or not
        /// </summary>
        public bool IsSeen { get; set; }

        /// <summary>
        ///     If the notification has been handled/dismissed by administrators
        /// </summary>
        public bool IsDismissed { get; set; }
    }
}
