namespace ServiceWebsite.Models
{
    /// <summary>
    /// The answer for a suitability question
    /// </summary>
    public class HearingSuitabilityAnswer
    {
        /// <summary>
        /// Unique identifier for the question answered
        /// </summary>
        public string QuestionKey { get; set; }
        
        /// <summary>
        /// Answer string, can be any type of answer, a boolean, enumeration etc
        /// </summary>
        public string Answer { get; set; }
        
        /// <summary>
        /// Supplementary data to further extend the answer, can be notes or data relating to the answer
        /// </summary>
        public string ExtendedAnswer { get; set; }
    }
}