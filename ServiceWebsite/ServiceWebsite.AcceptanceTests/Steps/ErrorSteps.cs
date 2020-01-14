using System.Collections.Generic;
using AcceptanceTests.Common.Driver.Browser;
using AcceptanceTests.Common.Driver.Helpers;
using AcceptanceTests.Common.PageObject.Pages;
using FluentAssertions;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Pages;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public class ErrorSteps
    {
        private readonly TestContext _c;
        private readonly Dictionary<string, UserBrowser> _browsers;
        private readonly ErrorPage _errorPage;
        private readonly LoginSteps _loginSteps;
        public ErrorSteps(TestContext testContext, Dictionary<string, UserBrowser> browsers, LoginSteps loginSteps, ErrorPage errorPage)
        {
            _c = testContext;
            _browsers = browsers;
            _loginSteps = loginSteps;
            _errorPage = errorPage;
        }

        [When(@"the user attempts to access the page on their unsupported browser")]
        public void WhenTheUserAttemptsToAccessThePageOnTheirUnsupportedBrowser()
        {
            _loginSteps.ProgressToNextPage();
        }

        [Then(@"the user is on the Unsupported Browser error page with text of how to rectify the problem")]
        public void ThenTheUserIsOnTheUnsupportedBrowserErrorPageWithTextOfHowToRectifyTheProblem()
        {
            _browsers[_c.CurrentUser.Key].Driver.Url.Should().NotContainAny(Page.AboutHearings.Url, Page.YourVideoHearing.Url);
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(_errorPage.UnsupportedBrowserTitle)
                .Displayed.Should().BeTrue();
        }
    }
}
