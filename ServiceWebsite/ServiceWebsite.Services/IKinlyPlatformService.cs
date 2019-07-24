using ServiceWebsite.Domain;
using System;
using System.Threading.Tasks;

namespace ServiceWebsite.Services
{
    public interface IKinlyPlatformService
    {
        Task<TestCallResult> GetTestCallScoreAsync(Guid participantId);
    }
}
