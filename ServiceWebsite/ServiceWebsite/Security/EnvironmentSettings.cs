namespace ServiceWebsite.Security
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
        public string VideoAppUrl { get; set; }

        public bool RequireHttpsMetadata { get; set; }
    }
}