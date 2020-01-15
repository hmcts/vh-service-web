using System.Collections.Generic;
using AcceptanceTests.Common.Driver.Browser;
using AcceptanceTests.Common.Driver.Helpers;
using AcceptanceTests.Common.PageObject.Helpers;
using AcceptanceTests.Common.Test.Steps;
using FluentAssertions;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Pages.SelfTest;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps.Individual
{
    [Binding]
    public class UseCamAndMicSteps : ISteps
    {
        private readonly Dictionary<string, UserBrowser> _browsers;
        private readonly TestContext _c;

        public UseCamAndMicSteps(Dictionary<string, UserBrowser> browsers, TestContext testContext)
        {
            _browsers = browsers;
            _c = testContext;
        }

        public void ProgressToNextPage()
        {
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(CommonLocators.ButtonWithInnerText("Switch on")).Click();
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(CommonLocators.ButtonWithInnerText("Watch video")).Click();
        }

        [When(@"the user clicks on the why do I need to use my camera and mic link")]
        public void WhenTheUserClicksOnTheWhyDoINeedToUseMyCameraAndMicLink()
        {
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(UseCamAndMicPage.WhyUseCameraLink).Click();
        }

        [Then(@"the explanation of why the need to use my camera and mic is shown")]
        public void ThenTheExplanationOfWhyTheNeedToUseMyCameraAndMicIsShown()
        {
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(UseCamAndMicPage.WhyUseCameraExplanation).Displayed.Should().BeTrue();
        }
    }
}
