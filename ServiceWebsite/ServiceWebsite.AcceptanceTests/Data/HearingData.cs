using System.Collections.Generic;
using System.Linq;
using System.Net;
using AcceptanceTests.Common.Api.Hearings;
using AcceptanceTests.Common.Api.Helpers;
using FluentAssertions;
using ServiceWebsite.Services.TestApi;
using Guid = System.Guid;

namespace ServiceWebsite.AcceptanceTests.Data
{
    public static class HearingData
    {
        public static HearingDetailsResponse CreateHearing(TestApiManager api, List<User> users)
        {
            var hearingRequest = new HearingRequestBuilder()
                .WithUsers(users)
                .Build();

            var hearingResponse = api.CreateHearing(hearingRequest);
            hearingResponse.StatusCode.Should().Be(HttpStatusCode.Created);
            var hearing = RequestHelper.Deserialise<HearingDetailsResponse>(hearingResponse.Content);
            hearing.Should().NotBeNull();
            ParticipantsShouldExistInTheDb(api, hearing.Id, users);
            NUnit.Framework.TestContext.WriteLine($"Hearing created with Hearing Id {hearing.Id}");
            return hearing;
        }

        private static void ParticipantsShouldExistInTheDb(TestApiManager api, Guid hearingId, List<User> users)
        {
            var hearingResponse = api.GetHearing(hearingId);
            var hearing = RequestHelper.Deserialise<HearingDetailsResponse>(hearingResponse.Content);
            hearing.Should().NotBeNull();
            foreach (var user in users.Where(user => user.User_type != UserType.CaseAdmin && user.User_type != UserType.VideoHearingsOfficer))
            {
                hearing.Participants.Any(x => x.Last_name.Equals(user.Last_name)).Should().BeTrue();
            }
        }
    }
}
