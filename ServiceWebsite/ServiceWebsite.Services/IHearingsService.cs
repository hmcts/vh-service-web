using System.Threading.Tasks;
using ServiceWebsite.Domain;

namespace ServiceWebsite.Services
{
    public interface IHearingsService
    {
        Task<Hearing[]> GetHearingsFor(string name);
    }
}