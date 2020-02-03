using System.Collections.Generic;
using AcceptanceTests.Common.Driver.Browser;
using AcceptanceTests.Common.Driver.Helpers;
using AcceptanceTests.Common.Driver.Support;
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
        private readonly LoginSteps _loginSteps;
        public ErrorSteps(TestContext testContext, Dictionary<string, UserBrowser> browsers, LoginSteps loginSteps)
        {
            _c = testContext;
            _browsers = browsers;
            _loginSteps = loginSteps;
        }

        [When(@"the user attempts to access the page on their unsupported browser")]
        public void WhenTheUserAttemptsToAccessThePageOnTheirUnsupportedBrowser()
        {
            if (_c.ServiceWebConfig.TestConfig.TargetBrowser != TargetBrowser.Ie11)
                _loginSteps.ProgressToNextPage();
        }

        [When(@"the user attempts to navigate to a nonexistent page")]
        public void WhenTheUserAttemptsToNavigateToANonexistentPage()
        {
            _browsers[_c.CurrentUser.Key].NavigateToPage(AddSlashToUrlIfRequired());
        }

        private string AddSlashToUrlIfRequired()
        {
            var baseUrl = _c.ServiceWebConfig.VhServices.ServiceWebUrl;
            var url = baseUrl[^1].Equals(char.Parse("/")) ? "non-existent-page" : "/non-existent-page";
            return url;
        }

        [Then(@"the user is on the Unsupported Browser error page with text of how to rectify the problem")]
        public void ThenTheUserIsOnTheUnsupportedBrowserErrorPageWithTextOfHowToRectifyTheProblem()
        {
            if (_c.ServiceWebConfig.TestConfig.TargetBrowser == TargetBrowser.Ie11)
            {
                _browsers[_c.CurrentUser.Key].Driver.Url.Should().NotContainAny(Page.AboutHearings.Url, Page.YourVideoHearing.Url, Page.VideoWeb.Url);
                _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(ErrorPage.UnsupportedBrowserTitleIe).Displayed.Should().BeTrue();
            }
            else
            {
                _browsers[_c.CurrentUser.Key].PageUrl(Page.UnsupportedBrowser.Url);
                _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(ErrorPage.UnsupportedBrowserText).Displayed.Should().BeTrue();
            }
        }

        [Then(@"the Not Found error page displays text of how to rectify the problem")]
        public void ThenTheNotFoundErrorPageDisplaysTextOfHowToRectifyTheProblem()
        {
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(ErrorPage.NotFoundPageTitle).Displayed.Should().BeTrue();
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(ErrorPage.TypedErrorMessage).Displayed.Should().BeTrue();
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(ErrorPage.PastedErrorMessage).Displayed.Should().BeTrue();
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(ErrorPage.LinkErrorMessage).Displayed.Should().BeTrue();
        }

        [Then(@"the Unauthorised error page displays text of how to rectify the problem")]
        public void ThenTheUnauthorisedErrorPageDisplaysTextOfHowToRectifyTheProblem()
        {
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(ErrorPage.UnauthorisedPageTitle).Displayed.Should().BeTrue();
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(ErrorPage.NotRegisteredErrorMessage).Displayed.Should().BeTrue();
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(ErrorPage.IsThisAMistakeErrorMessage).Displayed.Should().BeTrue();
        }
    }
}
