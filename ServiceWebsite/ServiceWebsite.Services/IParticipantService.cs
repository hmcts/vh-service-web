using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ServiceWebsite.Domain;

namespace ServiceWebsite.Services
{
    public interface IParticipantService
    {
        Task<IEnumerable<Participant>> GetParticipantsByUsernameAsync(string username);
        Task UpdateSuitabilityAnswers(Guid hearingId, Guid participantId, List<SuitabilityAnswer> answers);
    }
}