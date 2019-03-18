using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ServiceWebsite.Common;
using ServiceWebsite.Domain;

namespace ServiceWebsite.Services
{
    public class ParticipantService : IParticipantService
    {
        public async Task<Participant> FindParticipant(string userEmail)
        {
            
            return await Task.FromResult(new Participant(userEmail, Role.Individual));
        }
       
        private DateTime Today => DateTime.UtcNow.Date;
        private DateTime NextYear => DateTime.Today.AddYears(1).Date;
    }
}
