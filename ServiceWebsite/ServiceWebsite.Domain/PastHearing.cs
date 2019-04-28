using System;

namespace ServiceWebsite.Domain
{
    /// <summary>
    /// Logic to test if a hearing is in the past or not
    /// </summary>
    public interface IPastHearing
    {
        bool IsPast(DateTime dateTime);
    }
    
    
    public class PastSuitabilityQuestionnaireTimeLimit : IPastHearing 
    {
        public bool IsPast(DateTime dateTime)
        {
            // You can answer questions up until the time of the hearing
            return dateTime < DateTime.UtcNow;
        }
    }
}