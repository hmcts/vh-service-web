using System;
using System.Linq;
using System.Net;
using AcceptanceTests.Common.Api.Hearings;
using AcceptanceTests.Common.Api.Requests;
using AcceptanceTests.Common.Api.Users;
using AcceptanceTests.Common.Configuration.Users;
using FluentAssertions;
using ServiceWebsite.AcceptanceTests.Data;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.BookingsAPI.Client;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Hooks
{
    [Binding]
    public sealed class DataHooks
    {
        private const int Timeout = 60;
        private readonly TestContext _c;
        private readonly UserApiManager _userApiManager;
        private readonly BookingsApiManager _bookingsApiManager;
        private readonly ScenarioContext _scenario;

        public DataHooks(TestContext context, ScenarioContext scenario)
        {
            _c = context;
            _scenario = scenario;
            _bookingsApiManager = new BookingsApiManager(_c.ServiceWebConfig.VhServices.BookingsApiUrl, _c.Tokens.BookingsApiBearerToken);
            _userApiManager = new UserApiManager(_c.ServiceWebConfig.VhServices.UserApiUrl, _c.Tokens.UserApiBearerToken);
        }

        [BeforeScenario(Order = (int)HooksSequence.DataHooks)]
        public void AddHearing()
        {
            if (!_scenario.ScenarioInfo.Tags.Contains("NoHearing"))
                CreateHearing();
        }

        private void CreateHearing()
        {
            var hearingRequest = new HearingRequestBuilder()
                .WithUserAccounts(_c.UserAccounts)
                .Build();

            var hearingResponse = _bookingsApiManager.CreateHearing(hearingRequest);
            hearingResponse.StatusCode.Should().Be(HttpStatusCode.Created);
            var hearing = RequestHelper.DeserialiseSnakeCaseJsonToResponse<HearingDetailsResponse>(hearingResponse.Content);
            hearing.Should().NotBeNull();
            _c.Test.Hearing = hearing;
            ParticipantExistsInTheDb(hearing.Id).Should().BeTrue();
            _userApiManager.ParticipantsExistInAad(_c.UserAccounts, Timeout).Should().BeTrue();
        }

        private bool ParticipantExistsInTheDb(Guid hearingId)
        {
            var hearingResponse = _bookingsApiManager.GetHearing(hearingId);
            var hearing = RequestHelper.DeserialiseSnakeCaseJsonToResponse<HearingDetailsResponse>(hearingResponse.Content);
            hearing.Should().NotBeNull();
            return hearing.Participants.Any(x =>
                x.Username.ToLower().Equals(UserManager.GetDefaultParticipantUser(_c.UserAccounts).Username.ToLower()));
        }
    }
}
