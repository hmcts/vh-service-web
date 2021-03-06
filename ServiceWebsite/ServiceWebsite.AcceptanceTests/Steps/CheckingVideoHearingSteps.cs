using System.Collections.Generic;
using AcceptanceTests.Common.Driver.Drivers;
using AcceptanceTests.Common.Driver.Helpers;
using AcceptanceTests.Common.PageObject.Helpers;
using AcceptanceTests.Common.Test.Steps;
using FluentAssertions;
using ServiceWebsite.AcceptanceTests.Helpers;
using TechTalk.SpecFlow;
using TestApi.Contract.Dtos;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public class CheckingVideoHearingSteps : ISteps
    {
        private readonly Dictionary<UserDto, UserBrowser> _browsers;
        private readonly TestContext _c;

        public CheckingVideoHearingSteps(Dictionary<UserDto, UserBrowser> browsers, TestContext testContext)
        {
            _browsers = browsers;
            _c = testContext;
        }

        public void ProgressToNextPage()
        {
            _browsers[_c.CurrentUser].Click(CommonLocators.ButtonWithInnerText("Next"));
        }


        [Then(@"contact details are available on the Checking Video Hearing page")]
        public void ThenContactDetailsAreAvailableOnTheCheckingVideoHearingPage()
        {
            _browsers[_c.CurrentUser].Driver.WaitUntilVisible(CommonLocators.ElementContainingText(_c.WebConfig.TestConfig.CommonData.CommonOnScreenData.VhoPhone))
                .Displayed.Should().BeTrue();
        }
    }
}
