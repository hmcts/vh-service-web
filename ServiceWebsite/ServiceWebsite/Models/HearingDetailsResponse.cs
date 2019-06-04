namespace ServiceWebsite.Models
{
    /// <summary>
    /// Details for a hearing
    /// </summary>
    public class HearingDetailsResponse
    {
        /// <summary>
        /// The hearing lead case name
        /// </summary>
        public string CaseName { get; set; }
        
        /// <summary>
        /// The hearing lead case number
        /// </summary>
        public string CaseNumber { get; set; }
    }
}