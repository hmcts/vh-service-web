using System.Collections.Generic;
using AcceptanceTests.Common.Driver.Drivers;
using AcceptanceTests.Common.Driver.Helpers;
using AcceptanceTests.Common.PageObject.Helpers;
using AcceptanceTests.Common.Test.Steps;
using FluentAssertions;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Pages.SelfTest;
using ServiceWebsite.Services.TestApi;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps.Individual
{
    [Binding]
    public class UseCamAndMicSteps : ISteps
    {
        private readonly Dictionary<User, UserBrowser> _browsers;
        private readonly TestContext _c;

        public UseCamAndMicSteps(Dictionary<User, UserBrowser> browsers, TestContext testContext)
        {
            _browsers = browsers;
            _c = testContext;
        }

        public void ProgressToNextPage()
        {
            _browsers[_c.CurrentUser].Click(CommonLocators.ButtonWithInnerText("Switch on"));
            _browsers[_c.CurrentUser].Click(CommonLocators.ButtonWithInnerText("Watch video"));
        }

        [When(@"the user clicks on the why do I need to use my camera and mic link")]
        public void WhenTheUserClicksOnTheWhyDoINeedToUseMyCameraAndMicLink()
        {
            _browsers[_c.CurrentUser].Click(UseCamAndMicPage.WhyUseCameraLink);
        }

        [Then(@"the explanation of why the need to use my camera and mic is shown")]
        public void ThenTheExplanationOfWhyTheNeedToUseMyCameraAndMicIsShown()
        {
            _browsers[_c.CurrentUser].Driver.WaitUntilVisible(UseCamAndMicPage.WhyUseCameraExplanation).Displayed.Should().BeTrue();
        }
    }
}
