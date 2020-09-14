using System.Collections.Generic;
using System.Linq;
using System.Net;
using AcceptanceTests.Common.Api.Helpers;
using FluentAssertions;
using ServiceWebsite.AcceptanceTests.Data;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.Services.TestApi;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Hooks
{
    [Binding]
    public sealed class DataHooks
    {
        private const int ALLOCATE_USERS_FOR_MINUTES = 3;
        private readonly TestContext _c;
        private readonly ScenarioContext _scenario;

        public DataHooks(TestContext context, ScenarioContext scenario)
        {
            _c = context;
            _scenario = scenario;
        }

        [BeforeScenario(Order = (int)HooksSequence.DataHooks)]
        public void AddHearing()
        {
            AllocateUsers();

            if (!_scenario.ScenarioInfo.Tags.Contains("NoHearing"))
                CreateHearing();
        }

        private void AllocateUsers()
        {
            var userTypes = new List<UserType>
            {
                UserType.Judge, 
                UserType.VideoHearingsOfficer,
                UserType.Individual,
                UserType.Representative
            };

            var request = new AllocateUsersRequest()
            {
                Application = Application.ServiceWeb,
                Expiry_in_minutes = ALLOCATE_USERS_FOR_MINUTES,
                Is_prod_user = _c.WebConfig.IsLive,
                Test_type = TestType.Automated,
                User_types = userTypes
            };

            var response = _c.Api.AllocateUsers(request);
            response.StatusCode.Should().Be(HttpStatusCode.OK);
            response.Should().NotBeNull();
            var users = RequestHelper.Deserialise<List<UserDetailsResponse>>(response.Content);
            users.Should().NotBeNullOrEmpty();
            _c.Users = UserDetailsResponseToUsersMapper.Map(users);
            _c.Users.Should().NotBeNullOrEmpty();
        }

        private void CreateHearing()
        {
            _c.Test.Hearing = HearingData.CreateHearing(_c.Api, _c.Users);
        }
    }
}
