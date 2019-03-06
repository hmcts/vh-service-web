using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceWebsite.Common;
using ServiceWebsite.Domain;
using ServiceWebsite.Models;
using ServiceWebsite.Services;

namespace ServiceWebsite.Controllers
{
    [Route("/api/checklist")]
    [Authorize]
    public class ChecklistController : Controller
    {
        private readonly IChecklistService _checklist;

        public ChecklistController(IChecklistService checklist)
        {
            _checklist = checklist;
        }

        [HttpPost]
        public async Task<IActionResult> SubmitChecklist([FromBody]SubmitChecklistRequest request) {
            var checklist = new Checklist(User.Identity.Name, request.HearingId);
            checklist.Answers.AddRange(request.Answers.Select(MapAnswer));
            await _checklist.Submit(checklist);
            return Ok();
        }

        private ChecklistAnswer MapAnswer(ChecklistAnswerRequest answer)
        {
            return new ChecklistAnswer(answer.Question, answer.Answer, answer.Notes);
        }

        [HttpGet("status")]
        public async Task<IActionResult> GetChecklistStatus()
        {
            try
            {
                return Json(new {
                    IsRequired = await _checklist.IsRequiredForUser(User.Identity.Name)
                });
            }
            catch (NotFoundException e)
            {
                return NotFound($"No such participant [{e.ResourceId}]");
            }
        }
    }
}