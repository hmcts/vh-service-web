using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using AcceptanceTests.Common.Api.Hearings;
using AcceptanceTests.Common.Api.Helpers;
using BookingsApi.Contract.Responses;
using FluentAssertions;
using ServiceWebsite.AcceptanceTests.Data;
using ServiceWebsite.AcceptanceTests.Helpers;
using TechTalk.SpecFlow;
using TestApi.Contract.Enums;
using TestApi.Contract.Requests;
using TestApi.Contract.Responses;
using BookingsApi.Contract.Requests;
using BookingsApi.Contract.Requests.Enums;

namespace ServiceWebsite.AcceptanceTests.Hooks
{
    [Binding]
    public sealed class DataHooks
    {
        private const int ALLOCATE_USERS_FOR_MINUTES = 5;
        private readonly TestContext _c;
        private readonly ScenarioContext _scenario;
        private string _username;

        public DataHooks(TestContext context, ScenarioContext scenario)
        {
            _c = context;
            _scenario = scenario;
        }

        [BeforeScenario(Order = (int)HooksSequence.AllocateUsers)]
        public void AllocateUsers()
        {
            Allocate();
        }

        [BeforeScenario(Order = (int)HooksSequence.CreateHearing)]
        public void AddHearing()
        {
            if (_scenario.ScenarioInfo.Tags.Contains("NoHearing")) return;
            CreateHearing();
            var isJoh = _scenario.ScenarioInfo.Tags.Contains(UserType.PanelMember.ToString()) || _scenario.ScenarioInfo.Tags.Contains(UserType.Winger.ToString());
            _username = isJoh ? Users.GetUserNameForJOH(_c.Users) : Users.GetUserName(_c.Users);
            UserShouldNotHaveAnswers(_c.Api);
        }


        private void Allocate()
        {
            var userTypes = new List<UserType>
            {
                UserType.Judge, 
                UserType.VideoHearingsOfficer
            };

            if (_scenario.ScenarioInfo.Tags.Contains(UserType.Individual.ToString()))
            {
                userTypes.Add(UserType.Individual);
            }
            else if (_scenario.ScenarioInfo.Tags.Contains(UserType.Representative.ToString()))
            {
                userTypes.Add(UserType.Representative);
            }
            else if (_scenario.ScenarioInfo.Tags.Contains(UserType.PanelMember.ToString()))
            {
                userTypes.Add(UserType.PanelMember);
                userTypes.Add(UserType.Individual);

            }
            else if (_scenario.ScenarioInfo.Tags.Contains(UserType.Winger.ToString()))
            {
                userTypes.Add(UserType.Winger);
                userTypes.Add(UserType.Individual);
            }
            else
            {
                userTypes.Add(UserType.Individual);
            }

            var request = new AllocateUsersRequest()
            {
                Application = Application.ServiceWeb,
                ExpiryInMinutes = ALLOCATE_USERS_FOR_MINUTES,
                IsProdUser = _c.WebConfig.IsLive,
                TestType = TestType.Automated,
                UserTypes = userTypes
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
            //confirmhearing
            var request = new UpdateBookingStatusRequest()
            {
                UpdatedBy = _c.Test.Hearing.CreatedBy,
                CancelReason = null,
                Status = UpdateBookingStatus.Created
            };
            NUnit.Framework.TestContext.WriteLine($"Calling _c.Apis.TestApi.ConfirmHearingToCreateConference with hearing id {_c.Test.Hearing.Id}, request {request.UpdatedBy} {request.Status}");
            var response = _c.Api.ConfirmHearingToCreateConference(_c.Test.Hearing.Id, request);
            NUnit.Framework.TestContext.WriteLine($"response is {response}");
            response.StatusCode.Should().Be(HttpStatusCode.Created);
        }

        private void UserShouldNotHaveAnswers(TestApiManager api)
        {
            var response = api.GetSuitabilityAnswers(_username);
            var answers = RequestHelper.Deserialise<List<PersonSuitabilityAnswerResponse>>(response.Content);

            if (answers?.FirstOrDefault()?.Answers.Count > 0)
            {
                throw new DataException($"user with username '{_username}' has {answers.First().Answers.Count} previous answer(s) saved");
            }
        }
    }
}
