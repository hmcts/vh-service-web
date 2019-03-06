using System.Threading.Tasks;
using ServiceWebsite.Domain;

namespace ServiceWebsite.Services
{
    public interface IParticipantService
    {
        Task<Participant> FindParticipant(string userEmail);
    }
}