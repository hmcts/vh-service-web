using System;
using System.Threading.Tasks;
using ServiceWebsite.Domain;

namespace ServiceWebsite.Services
{
    public interface IKinlyPlatformService
    {
        Task<TestCallResult> GetTestCallScoreAsync(Guid participantId);
    }
}