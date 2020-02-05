using System;
using System.Linq;
using FluentAssertions;
using ServiceWebsite.AcceptanceTests.Data;
using ServiceWebsite.AcceptanceTests.Helpers;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Hooks
{
    [Binding]
    public sealed class DataHooks
    {
        private const int Timeout = 60;
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
            if (!_scenario.ScenarioInfo.Tags.Contains("NoHearing"))
                CreateHearing();
        }

        private void CreateHearing()
        {
            var hearing = new HearingData(_c.Apis.BookingsApi).CreateHearing(_c.UserAccounts);
            _c.Test.Hearing = hearing;
            _c.Apis.UserApi.ParticipantsExistInAad(_c.UserAccounts, Timeout).Should().BeTrue();
        }
    }
}
