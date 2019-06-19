using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using ServiceWebsite.BookingsAPI.Client;
using ServiceWebsite.Common;
using ServiceWebsite.Domain;

namespace ServiceWebsite.Services
{
    public class HearingsService : IHearingsService
    {
        private readonly IBookingsApiClient _bookingsApiClient;

        public HearingsService(IBookingsApiClient bookingsApiClient)
        {
            _bookingsApiClient = bookingsApiClient;
        }

        public async Task<Hearing> GetHearingFor(string username, Guid id)
        {
            try
            {
                var hearingResponse = await _bookingsApiClient.GetHearingDetailsByIdAsync(id);
                if (!HearingContainsParticipant(hearingResponse, username))
                {
                    throw new UnauthorizedAccessException($"User is not participant of hearing: {id}");
                }
                return Map(hearingResponse);
            }
            catch (BookingsApiException e)
            {
                if (e.StatusCode == (int) HttpStatusCode.NotFound)
                {
                    throw new NotFoundException($"Could not find hearing with id: {id}");
                }

                throw;
            }
        }

        private static bool HearingContainsParticipant(HearingDetailsResponse response, string username)
        {
            return response.Participants.Any(p => p.Username.Equals(username, StringComparison.OrdinalIgnoreCase));
        }

        public async Task<Guid> GetParticipantIdAsync(string username, Guid hearingId)
        {
            try
            {
                var hearingResponse = await _bookingsApiClient.GetHearingDetailsByIdAsync(hearingId);
                var participant = hearingResponse.Participants.First(p => p.Username.Equals(username, StringComparison.OrdinalIgnoreCase));

                if (participant == null )
                {
                    throw new UnauthorizedAccessException($"User is not participant of hearing: {hearingId}");
                }

                var participantId = participant.Id ?? Guid.Empty;

                return participantId;
            }
            catch (BookingsApiException e)
            {
                if (e.StatusCode == (int)HttpStatusCode.NotFound)
                {
                    throw new NotFoundException($"Could not find hearing with id: {hearingId}");
                }

                throw ;
            }

        }


        private static Hearing Map(HearingDetailsResponse response)
        {
            var hearingCase = response.Cases.FirstOrDefault(c => c.Is_lead_case.Value) ?? response.Cases.First();
            return new Hearing(
                response.Id.Value,
                hearingCase.Name,
                hearingCase.Number,
                response.Scheduled_date_time.Value,
                response.Case_type_name,
                response.Hearing_type_name
            );
        }

      }
}
