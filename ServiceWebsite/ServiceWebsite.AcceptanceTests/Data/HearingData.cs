using System.Collections.Generic;
using System.Linq;
using System.Net;
using AcceptanceTests.Common.Api.Hearings;
using AcceptanceTests.Common.Api.Requests;
using AcceptanceTests.Common.Configuration.Users;
using FluentAssertions;
using ServiceWebsite.BookingsAPI.Client;
using Guid = System.Guid;

namespace ServiceWebsite.AcceptanceTests.Data
{
    public class HearingData
    {
        private readonly BookingsApiManager _bookingsApi;

        public HearingData(BookingsApiManager bookingsApi)
        {
            _bookingsApi = bookingsApi;
        }

        public HearingDetailsResponse CreateHearing(List<UserAccount> userAccounts)
        {
            var hearingRequest = new HearingRequestBuilder()
                .WithUserAccounts(userAccounts)
                .Build();

            var hearingResponse = _bookingsApi.CreateHearing(hearingRequest);
            hearingResponse.StatusCode.Should().Be(HttpStatusCode.Created);
            var hearing = RequestHelper.DeserialiseSnakeCaseJsonToResponse<HearingDetailsResponse>(hearingResponse.Content);
            hearing.Should().NotBeNull();
            ParticipantExistsInTheDb(hearing.Id, userAccounts).Should().BeTrue();
            return hearing;
        }

        private bool ParticipantExistsInTheDb(Guid hearingId, List<UserAccount> userAccounts)
        {
            var hearingResponse = _bookingsApi.GetHearing(hearingId);
            var hearing = RequestHelper.DeserialiseSnakeCaseJsonToResponse<HearingDetailsResponse>(hearingResponse.Content);
            hearing.Should().NotBeNull();
            return hearing.Participants.Any(x => x.Username.ToLower().Equals(UserManager.GetDefaultParticipantUser(userAccounts).Username.ToLower()));
        }
    }
}
