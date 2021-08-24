namespace ServiceWebsite.Configuration
{
    /// <summary>
    ///     Service Settings.
    /// </summary>
    public class ServiceSettings
    {
        /// <summary>
        ///     The bookings api resource id
        /// </summary>
        public string BookingsApiResourceId { get; set; }

        /// <summary>
        ///     The bookings api url.
        /// </summary>
        public string BookingsApiUrl { get; set; }

        /// <summary>
        /// Gets or sets the Kinly endpoint where we get the participant self test score.
        /// </summary>
        public string KinlySelfTestScoreEndpointUrl { get; set; }

        /// <summary>
        /// Gets or sets the Pexip node uri for self testing.
        /// </summary>
        public string PexipSelfTestNodeUri { get; set; }

        /// <summary>
        ///     The user api resource id
        /// </summary>
        public string UserApiResourceId { get; set; }

        /// <summary>
        ///     The user api url.
        /// </summary>
        public string UserApiUrl { get; set; }

        /// <summary>
        ///     The video web url.
        /// </summary>
        public string VideoWebUrl { get; set; }


        /// <summary>
        ///     Flag to toggle mobile/tablet support.
        /// </summary>
        public bool EnableMobileSupport { get; set; }
    }
}
