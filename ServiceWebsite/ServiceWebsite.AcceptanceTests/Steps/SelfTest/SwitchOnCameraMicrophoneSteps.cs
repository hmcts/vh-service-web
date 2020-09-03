using System.Collections.Generic;
using AcceptanceTests.Common.Driver.Drivers;
using AcceptanceTests.Common.PageObject.Helpers;
using AcceptanceTests.Common.Test.Steps;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.Services.TestApi;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps.SelfTest
{
    [Binding]
    public class SwitchOnCameraMicrophoneSteps : ISteps
    {
        private readonly Dictionary<User, UserBrowser> _browsers;
        private readonly TestContext _c;

        public SwitchOnCameraMicrophoneSteps(Dictionary<User, UserBrowser> browsers, TestContext testContext)
        {
            _browsers = browsers;
            _c = testContext;
        }

        public void ProgressToNextPage()
        {
            _browsers[_c.CurrentUser].Click(CommonLocators.ButtonWithInnerText("Switch on"));
            var buttonText = _c.CurrentUser.User_type == UserType.Individual ? "Watch the video" : "Test equipment";
            _browsers[_c.CurrentUser].Click(CommonLocators.ButtonWithInnerText(buttonText));
        }
    }
}
