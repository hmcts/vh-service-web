using System;
using System.Linq;
using System.Threading.Tasks;
using HearingsAPI.Client;
using ServiceWebsite.Common;
using ServiceWebsite.Domain;

namespace ServiceWebsite.Services
{
    public class ParticipantService : IParticipantService
    {
        private readonly IVhApiClient _client;

        public ParticipantService(IVhApiClient client)
        {
            _client = client;
        }

        public async Task<Participant> FindParticipant(string userEmail)
        {
            var hearings = await _client.GetHearingsBetweenDatesAsync(Today, NextYear);
            var participations = hearings
                .SelectMany(h => h.Participants)
                .Where(participant => IsParticipant(participant, userEmail))
                .ToList();

            var anyParticipation = participations.FirstOrDefault();
            if (anyParticipation == null)
                throw new NotFoundException($"There are no upcoming hearings for participant with id [{userEmail}].", userEmail);

            return new Participant(userEmail, Enum.Parse<Role>(anyParticipation.Participant_role, true));
        }

        private bool IsParticipant(ParticipantResponse participant, string userEmail)
        {
            return participant.Username.Equals(userEmail, StringComparison.InvariantCultureIgnoreCase);
        }

        private DateTime Today => DateTime.UtcNow.Date;
        private DateTime NextYear => DateTime.Today.AddYears(1).Date;
    }
}
