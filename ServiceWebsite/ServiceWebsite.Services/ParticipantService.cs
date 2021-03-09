using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using BookingsApi.Client;
using BookingsApi.Contract.Requests;
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

        public async Task<IEnumerable<Participant>> GetParticipantsByUsernameAsync(string username)
        {
            try
            {
                var participants = await _bookingsApiClient.GetParticipantsByUsernameAsync(username);

                return participants.Select(x => new Participant { Id = x.Id, Username = x.Username });
            }
            catch (BookingsApiException e)
            {
                if (e.StatusCode == (int)HttpStatusCode.NotFound)
                {
                    return Enumerable.Empty<Participant>();
                }

                throw;
            }
        }

        public async Task UpdateSuitabilityAnswers(Guid hearingId, Guid participantId, List<SuitabilityAnswer> answers)
        {
            var request = answers.Select(answer => new SuitabilityAnswersRequest
            {
                Key = answer.QuestionKey, Answer = answer.Answer, ExtendedAnswer = answer.ExtendedAnswer
            });

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
    }
}
