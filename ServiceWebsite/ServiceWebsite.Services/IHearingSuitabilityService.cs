using System.Collections.Generic;
using System.Threading.Tasks;
using ServiceWebsite.Domain;

namespace ServiceWebsite.Services
{
    public interface IHearingSuitabilityService
    {
        /// <summary>
        /// Returns upcoming hearings and their suitability answers  
        /// </summary>
        /// <param name="username">Username to return hearings for</param>
        /// <returns>An empty list if user has no upcoming hearings</returns>
        Task<List<HearingSuitability>> GetUpcomingHearingsSuitability(string username);
    }
}