using System.Collections.Generic;
using AcceptanceTests.Common.Driver.Drivers;
using AcceptanceTests.Common.PageObject.Pages;
using AcceptanceTests.Common.Test.Steps;
using FluentAssertions;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Pages;
using TestApi.Contract.Dtos;
using TechTalk.SpecFlow;
using System.Threading;
using AcceptanceTests.Common.Driver.Helpers;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public sealed class LoginSteps : ISteps
    {
        private const int ReachedThePageRetries = 4;
        private LoginSharedSteps _loginSharedSteps;
        private readonly Dictionary<UserDto, UserBrowser> _browsers;
        private readonly TestContext _c;

        public LoginSteps(Dictionary<UserDto, UserBrowser> browsers, TestContext testContext)
        {
            _browsers = browsers;
            _c = testContext;
        }

        [When(@"the user logs in with valid credentials")]
        public void ProgressToNextPage()
        {
            NUnit.Framework.TestContext.WriteLine($"The login data is Username: {_c.CurrentUser.Username}, UserType: {_c.CurrentUser.UserType}, Testtype: {_c.CurrentUser.TestType}");
            _loginSharedSteps = new LoginSharedSteps(_browsers[_c.CurrentUser], _c.CurrentUser.Username, _c.WebConfig.TestConfig.TestUserPassword);
            _loginSharedSteps.ProgressToNextPage();
        }

        [When(@"the user attempts to logout")]
        public void WhenTheUserAttemptsToLogout()
        { 
           _browsers[_c.CurrentUser].Click(CommonServiceWebPage.SignOutButton);
           _browsers[_c.CurrentUser].WaitForPageToLoad();
           _browsers[_c.CurrentUser].Click(LogOutPage.LogoutLink(_c.CurrentUser.DisplayName));
        }

        [When(@"the user signs out")]
        public void WhenTheUserSignsOut()
        {
            WhenTheUserAttemptsToLogout();
            _browsers[_c.CurrentUser].Driver.WaitUntilVisible(CommonPages.SignOutMessage, _c.WebConfig.SeleniumElementTimeout).Displayed.Should().BeTrue();
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
            _browsers[_c.CurrentUser].Retry(() => _browsers[_c.CurrentUser].Driver.Title.Trim().Should().Be(LoginPage.SignInTitle), ReachedThePageRetries);
        }

        [Then(@"the user is redirected to Video Web")]
        public void ThenIndividualUserShouldBeRedirectedToVideoWeb()
        {
            _browsers[_c.CurrentUser].WaitForPageToLoad(60);
            _browsers[_c.CurrentUser].Retry(() => _browsers[_c.CurrentUser].Driver.Url.Trim().Should().Contain(Page.VideoWeb.Url), ReachedThePageRetries);
        }
    }
}