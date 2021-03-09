using System.Collections.Generic;
using System.Linq;
using System.Net;
using AcceptanceTests.Common.Api.Hearings;
using AcceptanceTests.Common.Api.Helpers;
using BookingsApi.Contract.Responses;
using FluentAssertions;
using TestApi.Contract.Dtos;
using TestApi.Contract.Enums;
using TestApi.Contract.Requests;
using Guid = System.Guid;

namespace ServiceWebsite.AcceptanceTests.Data
{
    public static class HearingData
    {
        public static HearingDetailsResponse CreateHearing(TestApiManager api, List<UserDto> users)
        {
            var isWinger = users.Any(X => X.UserType == UserType.Winger);

            var hearingRequest = isWinger ? CreateHearingForWinger(users) : new HearingRequestBuilder()
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

        private static CreateHearingRequest CreateHearingForWinger(List<UserDto> users)
        {
            return new HearingRequestBuilder()
               .WithUsers(users)
               .WithCACDCaseType()
               .Build();
        }
        private static void ParticipantsShouldExistInTheDb(TestApiManager api, Guid hearingId, List<UserDto> users)
        {
            var hearingResponse = api.GetHearing(hearingId);
            var hearing = RequestHelper.Deserialise<HearingDetailsResponse>(hearingResponse.Content);
            hearing.Should().NotBeNull();
            foreach (var user in users.Where(user => user.UserType != UserType.CaseAdmin && user.UserType != UserType.VideoHearingsOfficer))
            {
                hearing.Participants.Any(x => x.LastName.Equals(user.LastName)).Should().BeTrue();
            }
        }
    }
}
