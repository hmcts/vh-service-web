using System.Collections.Generic;

namespace ServiceWebsite.UnitTests.Response
{
       /// <summary>
        ///     Participant details
        /// </summary>
        public class ParticipantResponse
        {
            /// <summary>
            ///     Participant Id.
            /// </summary>
            public long Id { get; set; }

            /// <summary>
            ///     Participant Title.
            /// </summary>
            public string Title { get; set; }

            /// <summary>
            ///     Participant first name.
            /// </summary>
            public string FirstName { get; set; }

            /// <summary>
            ///     Participant middle name.
            /// </summary>
            public string MiddleNames { get; set; }

            /// <summary>
            ///     Participant last name.
            /// </summary>
            public string LastName { get; set; }

            /// <summary>
            ///     Participant display name.
            /// </summary>
            public string DisplayName { get; set; }

            /// <summary>
            ///     Participant username
            /// </summary>
            public string Username { get; set; }

            /// <summary>
            ///     Participant username
            /// </summary>
            public string Email { get; set; }

            /// <summary>
            ///     Participant external Id.
            /// </summary>
            public string ExternalId { get; set; }

            /// <summary>
            ///     Flag to indicate that the participant is an external user.
            /// </summary>
            public bool ExternalFlag { get; set; }

            /// <summary>
            ///     Participant landline phone number.
            /// </summary>
            public string Phone { get; set; }

            /// <summary>
            ///     Participant mobile phone number.
            /// </summary>
            public string MobilePhone { get; set; }

            /// <summary>
            ///     name of the organisation that participant belongs.
            /// </summary>
            public string OrganisationName { get; set; }

            /// <summary>
            ///     Organisation address.
            /// </summary>
            public string OrganisationAddress { get; set; }

            /// <summary>
            ///     Name of a person who represents the participant.
            /// </summary>
            public string Representing { get; set; }

            /// <summary>
            ///     Participant feed Id.
            /// </summary>
            public long FeedId { get; set; }

            /// <summary>
            ///     Participant location(end point).
            /// </summary>
            public string Location { get; set; }

            /// <summary>
            ///     Participant role.
            /// </summary>
            public string ParticipantRole { get; set; }

            /// <summary>
            ///     Participant's current status.
            /// </summary>
            public ParticipantStatusResponse CurrentStatus { get; set; }

            /// <summary>
            ///     List of participant notifications
            /// </summary>
            public List<ParticipantNotificationResponse> Notifications { get; set; }
        }
    
}
