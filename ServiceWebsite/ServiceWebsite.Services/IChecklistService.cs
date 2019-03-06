using System.Threading.Tasks;
using ServiceWebsite.Domain;

namespace ServiceWebsite.Services
{
    public interface IChecklistService
    {
        Task<bool> IsRequiredForUser(string username);
        
        Task Submit(Checklist checklist);
    }
}