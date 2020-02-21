using System.Collections.Generic;
using AcceptanceTests.Common.Driver.Browser;
using AcceptanceTests.Common.Driver.Helpers;
using AcceptanceTests.Common.PageObject.Helpers;
using AcceptanceTests.Common.Test.Steps;
using ServiceWebsite.AcceptanceTests.Helpers;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps.SelfTest
{
    [Binding]
    public class SwitchOnCameraMicrophoneSteps : ISteps
    {
        private readonly Dictionary<string, UserBrowser> _browsers;
        private readonly TestContext _c;

        public SwitchOnCameraMicrophoneSteps(Dictionary<string, UserBrowser> browsers, TestContext testContext)
        {
            _browsers = browsers;
            _c = testContext;
        }

        public void ProgressToNextPage()
        {
            _browsers[_c.CurrentUser.Key].Click(CommonLocators.ButtonWithInnerText("Switch on"));
            var buttonText = _c.CurrentUser.Role.ToLower().Equals("individual") ? "Watch the video" : "Test equipment";
            _browsers[_c.CurrentUser.Key].Click(CommonLocators.ButtonWithInnerText(buttonText));
        }
    }
}
