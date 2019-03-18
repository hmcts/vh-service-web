using System;
using System.Linq;
using System.Threading.Tasks;
using ServiceWebsite.Domain;

namespace ServiceWebsite.Services
{
    public class ChecklistService : IChecklistService
    {

        public ChecklistService() {
            
        }

        public async Task<bool> IsRequiredForUser(string username) {

             return await Task.FromResult(true);
           
        }

        public async Task Submit(Checklist checklist)
        {
            await Task.FromResult(0);
        }

    }
}