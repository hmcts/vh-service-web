using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Threading;
using AcceptanceTests.Common.Api.Hearings;
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
        private const int ALLOCATE_USERS_FOR_MINUTES = 5;
        private readonly TestContext _c;
        private readonly ScenarioContext _scenario;
        private string _username;
        private readonly Random _random;

        public DataHooks(TestContext context, ScenarioContext scenario)
        {
            _c = context;
            _scenario = scenario;
            _random = new Random();
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
            _username = _c.Users.Any(X => X.User_type == UserType.Representative) ? Users.GetRepresentativeUser(_c.Users).Username : Users.GetIndividualUser(_c.Users).Username;
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
            else
            {
                userTypes.Add(UserType.Individual);
            }

            var request = new AllocateUsersRequest()
            {
                Application = Application.ServiceWeb,
                Expiry_in_minutes = ALLOCATE_USERS_FOR_MINUTES,
                Is_prod_user = _c.WebConfig.IsLive,
                Test_type = TestType.Automated,
                User_types = userTypes
            };

            Thread.Sleep(TimeSpan.FromSeconds(GetRandomNumberForParallelExecution(8)));

            var response = _c.Api.AllocateUsers(request);
            response.StatusCode.Should().Be(HttpStatusCode.OK);
            response.Should().NotBeNull();
            var users = RequestHelper.Deserialise<List<UserDetailsResponse>>(response.Content);
            users.Should().NotBeNullOrEmpty();
            _c.Users = UserDetailsResponseToUsersMapper.Map(users);
            _c.Users.Should().NotBeNullOrEmpty();
        }

        public double GetRandomNumberForParallelExecution(int maximum)
        {
            return _random.Next(maximum);
        }

        private void CreateHearing()
        {
            _c.Test.Hearing = HearingData.CreateHearing(_c.Api, _c.Users);
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
