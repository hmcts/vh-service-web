namespace ServiceWebsite.Common
{
    /// <summary>
    /// Constants for various types of traces
    /// </summary>
    public static class TraceCategories
    {
        /// <summary>
        /// Related to user authorization and access
        /// </summary>
        public const string Authorization = "Authorization";

        /// <summary>
        /// Unhandled exceptions
        /// </summary>
        public static string Unhandled = "Unhandled";

        /// <summary>
        /// Logging related to missing data, users or hearings
        /// </summary>
        public static string MissingResource = "MissingResource";
    }
}
