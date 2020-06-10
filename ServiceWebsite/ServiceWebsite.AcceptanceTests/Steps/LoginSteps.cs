using System.Collections.Generic;
using AcceptanceTests.Common.Driver.Drivers;
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
        private const int ReachedThePageRetries = 2;
        private LoginSharedSteps _loginSharedSteps;
        private readonly Dictionary<string, UserBrowser> _browsers;
        private readonly TestContext _c;

        public LoginSteps(Dictionary<string, UserBrowser> browsers, TestContext testContext)
        {
            _browsers = browsers;
            _c = testContext;
        }

        [When(@"the user logs in with valid credentials")]
        public void ProgressToNextPage()
        {
            _loginSharedSteps = new LoginSharedSteps(_browsers[_c.CurrentUser.Key], _c.CurrentUser.Username, _c.WebConfig.TestConfig.TestUserPassword);
            _loginSharedSteps.ProgressToNextPage();
        }

        [When(@"the user attempts to logout")]
        public void WhenTheUserAttemptsToLogout()
        { 
           _browsers[_c.CurrentUser.Key].Click(CommonServiceWebPage.SignOutButton);
        }

        [When(@"the user signs out")]
        public void WhenTheUserSignsOut()
        {
            WhenTheUserAttemptsToLogout();
            ThenTheUserShouldBeNavigatedToSignInScreen();
        }

        [When(@"the user signs back in with valid credentials")]
        public void WhenTheUserReSignsInWithValidCredentials()
        {
            _loginSharedSteps.ReSignBackIn();
        }

        [Then(@"the sign out link is displayed")]
        public void ThenTheSignOutLinkIsDisplayed()
        {
            _loginSharedSteps.ThenTheSignOutLinkIsDisplayed();
        }

        [Then(@"the user should be navigated to sign in screen")]
        public void ThenTheUserShouldBeNavigatedToSignInScreen()
        {
            _browsers[_c.CurrentUser.Key].Retry(() => _browsers[_c.CurrentUser.Key].Driver.Title.Trim().Should().Be(LoginPage.SignInTitle), ReachedThePageRetries);
        }

        [Then(@"the user is redirected to Video Web")]
        public void ThenIndividualUserShouldBeRedirectedToVideoWeb()
        {
            _browsers[_c.CurrentUser.Key].Retry(() => _browsers[_c.CurrentUser.Key].Driver.Url.Trim().Should().Contain(Page.VideoWeb.Url), ReachedThePageRetries);
        }
    }
}