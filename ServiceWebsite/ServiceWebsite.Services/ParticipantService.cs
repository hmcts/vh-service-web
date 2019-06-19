using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using ServiceWebsite.BookingsAPI.Client;
using ServiceWebsite.Common;
using ServiceWebsite.Domain;

namespace ServiceWebsite.Services
{
    public class ParticipantService : IParticipantService
    {
        private readonly IBookingsApiClient _bookingsApiClient;

        public ParticipantService(IBookingsApiClient bookingsApiClient)
        {
            _bookingsApiClient = bookingsApiClient;
        }

        public async Task<Participant> FindParticipant(string userEmail)
        {

            return await Task.FromResult(new Participant(userEmail, Role.Individual));
        }

        public async Task UpdateSuitabilityAnswers(Guid hearingId, Guid participantId, List<SuitabilityAnswer> answers)
        {
            var request = Map(answers);
            try
            {
                await _bookingsApiClient.UpdateSuitabilityAnswersAsync(hearingId, participantId, request);
            }
            catch(BookingsApiException e)
            {
                if (e.StatusCode == (int)HttpStatusCode.NotFound)
                {
                    throw new NotFoundException(e.Response);
                }
                throw;
            }
        }

        private static List<SuitabilityAnswersRequest> Map(List<SuitabilityAnswer> answers)
        {
            List<SuitabilityAnswersRequest> answersRequests = new List<SuitabilityAnswersRequest>();
            foreach (SuitabilityAnswer answer in answers)
            {
                answersRequests.Add(new SuitabilityAnswersRequest() { Key = answer.QuestionKey, Answer = answer.Answer, Extended_answer = answer.ExtendedAnswer });

            }
            return answersRequests;
        }
        private DateTime Today => DateTime.UtcNow.Date;
        private DateTime NextYear => DateTime.Today.AddYears(1).Date;
    }
}
