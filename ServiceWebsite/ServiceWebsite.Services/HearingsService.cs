using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ServiceWebsite.Common;
using ServiceWebsite.Domain;

namespace ServiceWebsite.Services
{
    public class HearingsService : IHearingsService
    {
        public async Task<Hearing[]> GetHearingsFor(string userEmail)
        {
           
            List<Hearing> hearings = new List<Hearing>();
            for(int i=1;i<=5;i++)
            {

                hearings.Add(new Hearing(1,"Case "+i,"Case "+i));
            }
            return await Task.FromResult(hearings.ToArray());
           
        }

        private DateTime Today => DateTime.UtcNow.Date;
        private DateTime NextYear => DateTime.Today.AddYears(1).Date;
    }
}
