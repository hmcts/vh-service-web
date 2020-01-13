using System.Collections.Generic;
using AcceptanceTests.Common.Driver.Browser;
using AcceptanceTests.Common.Driver.Helpers;
using AcceptanceTests.Common.PageObject.Helpers;
using AcceptanceTests.Common.Test.Steps;
using FluentAssertions;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Pages.IndividualPages;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps.Individual
{
    [Binding]
    public class UseCamAndMicSteps : ISteps
    {
        private readonly Dictionary<string, UserBrowser> _browsers;
        private readonly TestContext _c;
        private readonly UseCamAndMicPage _useCamAndMicPage;

        public UseCamAndMicSteps(Dictionary<string, UserBrowser> browsers, TestContext testContext, UseCamAndMicPage useCamAndMicPage)
        {
            _browsers = browsers;
            _c = testContext;
            _useCamAndMicPage = useCamAndMicPage;
        }

        public void ProgressToNextPage()
        {
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(CommonLocators.ButtonWithInnerText("Switch on")).Click();
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(CommonLocators.ButtonWithInnerText("Watch video")).Click();
        }

        [When(@"the user clicks on the why do I need to use my camera and mic link")]
        public void WhenTheUserClicksOnTheWhyDoINeedToUseMyCameraAndMicLink()
        {
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(_useCamAndMicPage.WhyUseCameraLink).Click();
        }

        [Then(@"the explanation of why the need to use my camera and mic is shown")]
        public void ThenTheExplanationOfWhyTheNeedToUseMyCameraAndMicIsShown()
        {
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(_useCamAndMicPage.WhyUseCameraExplanation).Displayed.Should().BeTrue();
        }
    }
}
