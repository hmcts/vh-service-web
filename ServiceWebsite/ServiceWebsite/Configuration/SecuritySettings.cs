namespace ServiceWebsite.Configuration
{
    /// <summary>
    ///     Security Settings
    /// </summary>
    public class SecuritySettings
    {
        /// <summary>
        /// Instrumentation key for the app insights to log to
        /// </summary>
        public string AppInsightsKey { get; set; }

        /// <summary>
        /// The authority to generate and validate Adal tokens against
        /// </summary>
        public string Authority { get; set; }

        /// <summary>
        ///     Base Video Url for videos stored in azure storage
        /// </summary>
        public string BaseVideoUrl { get; set; }

        /// <summary>
        /// Id for app registration of this application
        /// </summary>
        public string ClientId { get; set; }

        /// <summary>
        /// Secret used to authenticate for the user api 
        /// </summary>
        public string ClientSecret { get; set; }

        /// <summary>
        /// The redirect uri on successful logout
        /// </summary>
        public string PostLogoutRedirectUri { get; set; }

        /// <summary>
        /// The redirect uri on successful login
        /// </summary>
        public string RedirectUri { get; set; }

        /// <summary>
        /// The Azure tenant the app registration is register in
        /// </summary>
        public string TenantId { get; set; }

        /// <summary>
        /// Id for app registration for the user api
        /// </summary>
        public string UserApiClientId { get; set; }

        /// <summary>
        /// Secret used to authenticate user api
        /// </summary>
        public string UserApiClientSecret { get; set; }
    }
}
