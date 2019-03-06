using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HearingsAPI.Client;
using ServiceWebsite.Common;
using ServiceWebsite.Domain;

namespace ServiceWebsite.Services
{
    public class HearingsService : IHearingsService
    {
        private readonly IVhApiClient _client;

        public HearingsService(IVhApiClient client)
        {
            _client = client;
        }

        public async Task<Hearing[]> GetHearingsFor(string userEmail)
        {
            var hearings = await _client.GetHearingsBetweenDatesAsync(Today, NextYear);
            return hearings.Where(hearing => ContainsParticipant(hearing.Participants, userEmail))
                .Select(ToHearingModel).ToArray();
        }

        private bool ContainsParticipant(IEnumerable<ParticipantResponse> participants, string userEmail)
        {
            return participants.Any(participant => participant.Username.Equals(userEmail, StringComparison.InvariantCultureIgnoreCase));
        }

        private Hearing ToHearingModel(HearingResponse hearing) {
            var hearingCase = hearing.Cases.FirstOrDefault();
            return new Hearing(hearing.Id.Value, hearingCase.Name, hearingCase.Number);
        }

        private DateTime Today => DateTime.UtcNow.Date;
        private DateTime NextYear => DateTime.Today.AddYears(1).Date;
    }
}
