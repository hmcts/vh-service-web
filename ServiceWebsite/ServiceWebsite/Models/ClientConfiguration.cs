namespace ServiceWebsite.Models
{
    /// <summary>
    /// Contains the configuration used by client
    /// </summary>
    public class ClientConfiguration
    {
        /// <summary>
        /// Absolute url to the video conferencing app website
        /// </summary>
        public string VideoAppUrl { get; set; }

        /// <summary>
        /// Key identifying app insights instance to log to
        /// </summary>
        public string AppInsightsInstrumentationKey { get; set; }
        public string TenantId { get; internal set; }
        public string ClientId { get; internal set; }
        public string RedirectUri { get; internal set; }
        public string PostLogoutRedirectUri { get; internal set; }

        /// <summary>
        ///     Base Video Url for videos stored in azure storage
        /// </summary>
        public string BaseVideoUrl { get; set; }

        /// <summary>
        /// Gets or sets the Pexip node uri for self testing.
        /// </summary>
        public string PexipSelfTestNodeUri { get; set; }

        /// <summary>
        /// Gets or sets the Kinly endpoint where we get the participant self test score.
        /// </summary>
        public string KinlySelfTestScoreEndpointUrl { get; set; }

        /// <summary>
        /// Flag to toggle mobile/tablet support for service web.
        /// </summary>
        public bool EnableMobileSupport { get; set; }
    }
}
