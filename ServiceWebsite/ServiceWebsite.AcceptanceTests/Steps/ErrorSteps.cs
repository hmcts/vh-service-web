using System.Collections.Generic;
using AcceptanceTests.Common.Driver.Drivers;
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
        public ErrorSteps(TestContext testContext, Dictionary<string, UserBrowser> browsers)
        {
            _c = testContext;
            _browsers = browsers;
        }

        [When(@"the user attempts to navigate to a nonexistent page")]
        public void WhenTheUserAttemptsToNavigateToANonexistentPage()
        {
            _browsers[_c.CurrentUser.Key].NavigateToPage(AddSlashToUrlIfRequired());
        }

        private string AddSlashToUrlIfRequired()
        {
            var baseUrl = _c.WebConfig.VhServices.ServiceWebUrl;
            var url = baseUrl[^1].Equals(char.Parse("/")) ? "non-existent-page" : "/non-existent-page";
            return url;
        }

        [Then(@"the user is on the Unsupported Browser error page with text of how to rectify the problem")]
        public void ThenTheUserIsOnTheUnsupportedBrowserErrorPageWithTextOfHowToRectifyTheProblem()
        {
            _browsers[_c.CurrentUser.Key].PageUrl(Page.UnsupportedBrowser.Url);
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(ErrorPage.UnsupportedBrowserText).Displayed.Should().BeTrue();
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

        [Then(@"the user is on the Unsupported Device error page with text of how to rectify the problem")]
        public void ThenTheUserIsOnTheUnsupportedDeviceErrorPageWithTextOfHowToRectifyTheProblem()
        {
            _browsers[_c.CurrentUser.Key].PageUrl(Page.UnsupportedDevice.Url);
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(ErrorPage.UnsupportedDeviceTitle).Displayed.Should().BeTrue();
        }
    }
}
