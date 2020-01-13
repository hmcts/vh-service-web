namespace ServiceWebsite.Configuration
{
    public class EnvironmentSettings
    {
        public string Authority => "https://login.microsoftonline.com/";

        /// <summary>
        /// Instrumentation key for the app insights to log to
        /// </summary>
        public string AppInsightsKey { get; set; }

        /// <summary>Resource in AD to request token for when authenticating</summary>
        public string HearingsApiResourceId { get; set; }

        /// <summary>
        /// Tenant holding the app registration to authenticate with <see cref="ClientId"/> in
        /// </summary>
        public string TenantId { get; set; }

        /// <summary>Application identity in AD</summary>
        public string ClientId { get; set; }

        /// <summary>Secret used to authenticate to the app identity</summary>
        public string ClientSecret { get; set; }

        public string HearingsApiUrl { get; set; }
        public string VideoWebUrl { get; set; }

        public bool RequireHttpsMetadata { get; set; }

        /// <summary>
        ///     Base Video Url for videos stored in azure storage
        /// </summary>
        public string BaseVideoUrl { get; set; }
        
        /// <summary>
        /// The redirect uri on successful login
        /// </summary>
        public string RedirectUri { get; set; }
        
        /// <summary>
        /// The redirect uri on successful logout
        /// </summary>
        public string PostLogoutRedirectUri { get; set; }
    }
}