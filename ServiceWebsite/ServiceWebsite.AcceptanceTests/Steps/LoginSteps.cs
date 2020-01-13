using System.Collections.Generic;
using AcceptanceTests.Common.Driver.Browser;
using AcceptanceTests.Common.Driver.Helpers;
using AcceptanceTests.Common.PageObject.Pages;
using AcceptanceTests.Common.Test.Steps;
using FluentAssertions;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Pages;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public sealed class LoginSteps : ISteps
    {
        private LoginSharedSteps _loginSharedSteps;
        private readonly Dictionary<string, UserBrowser> _browsers;
        private readonly TestContext _c;
        private readonly LoginPage _loginPage;
        private readonly CommonPages _commonPages;
        private readonly CommonServiceWebPage _commonServiceWebPage;
        private const int ReachedThePageRetries = 2;

        public LoginSteps(Dictionary<string, UserBrowser> browsers, TestContext testContext,
            LoginPage loginPage, CommonPages commonPages, CommonServiceWebPage commonServiceWebPage)
        {
            _browsers = browsers;
            _c = testContext;
            _loginPage = loginPage;
            _commonPages = commonPages;
            _commonServiceWebPage = commonServiceWebPage;
        }

        [When(@"the user logs in with valid credentials")]
        public void ProgressToNextPage()
        {
            _loginSharedSteps = new LoginSharedSteps(_browsers[_c.CurrentUser.Key].Driver, _loginPage, _commonPages, _c.CurrentUser.Username, _c.ServiceWebConfig.TestConfig.TestUserPassword);
            _loginSharedSteps.ProgressToNextPage();
        }

        [When(@"the user attempts to logout")]
        public void WhenTheUserAttemptsToLogout()
        { 
           _browsers[_c.CurrentUser.Key].Driver.WaitUntilElementClickable(_commonServiceWebPage.SignOutButton).Click();
        }

        [Then(@"the sign out link is displayed")]
        public void ThenTheSignOutLinkIsDisplayed()
        {
            _loginSharedSteps.ThenTheSignOutLinkIsDisplayed();
        }

        [Then(@"the user should be navigated to sign in screen")]
        public void ThenTheUserShouldBeNavigatedToSignInScreen()
        {
            _browsers[_c.CurrentUser.Key].Retry(() => _browsers[_c.CurrentUser.Key].Driver.Title.Trim().Should().Be(_loginPage.SignInTitle), ReachedThePageRetries);
        }

        [Then(@"the user is redirected to Video Web")]
        public void ThenIndividualUserShouldBeRedirectedToVideoWeb()
        {
            _browsers[_c.CurrentUser.Key].Retry(() => _browsers[_c.CurrentUser.Key].Driver.Title.Trim().Should().Contain(_c.ServiceWebConfig.VhServices.VideoWebUrl), ReachedThePageRetries);

        }
    }
}