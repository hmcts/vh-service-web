using System;
using System.Linq;
using System.Threading.Tasks;
using HearingsAPI.Client;
using ServiceWebsite.Domain;

namespace ServiceWebsite.Services
{
    public class ChecklistService : IChecklistService
    {
        IVhApiClient _client { get; }

        public ChecklistService(IVhApiClient client) {
            _client = client;
        }

        public async Task<bool> IsRequiredForUser(string username) {
            var response = await _client.GetHearingParticipantChecklistByUsernameAsync(username);
            if (!response.Is_required.Value) {
                Console.WriteLine($"Participant [{username}] is according to api not required to answer checklist.");
            }
            
            return response.Is_required.Value;
        }

        public async Task Submit(Checklist checklist)
        {
            var participant = await _client.GetHearingParticipantByUsernameAsync(checklist.UserEmail);
            var request = new AddPreHearingChecklistRequest();
            request.Question_answers = checklist.Answers.Select(MapToAnswerSubmitRequest).ToList();
            await _client.AddChecklistToHearingParticipantAsync(checklist.HearingId, participant.Id.Value, request);
        }

        private QuestionAnswerRequest MapToAnswerSubmitRequest(ChecklistAnswer answer)
        {
            return new QuestionAnswerRequest {
                Answer = answer.Answer,
                Question_key = answer.Question,
                Notes = answer.Notes
            };
        }
    }
}