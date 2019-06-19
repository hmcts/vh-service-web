using System;
using System.Threading.Tasks;
using ServiceWebsite.Domain;

namespace ServiceWebsite.Services
{
    public interface IHearingsService
    {
        Task<Hearing> GetHearingFor(string username, Guid id);
        Task<Guid?> GetParticipantIdAsync(string username, Guid hearingId);
    }
}