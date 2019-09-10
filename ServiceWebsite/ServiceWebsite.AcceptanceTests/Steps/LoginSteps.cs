using System;
using FluentAssertions;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.NuGet.Contexts;
using ServiceWebsite.AcceptanceTests.NuGet.Helpers;
using ServiceWebsite.AcceptanceTests.NuGet.Hooks;
using ServiceWebsite.AcceptanceTests.Pages;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public class LoginSteps
    {
        private readonly BrowserContext _browserContext;
        private readonly MicrosoftLoginPage _loginPage;
        private readonly ScenarioContext _scenarioContext;
        private readonly TestContextBase _testContext;
        public LoginSteps(MicrosoftLoginPage loginPage,
            ScenarioContext injectedContext, TestContextBase testContext, BrowserContext browserContext)
        {
            _loginPage = loginPage;
            _scenarioContext = injectedContext;
            _testContext = testContext;
            _browserContext = browserContext;
        }

        public void AdminOnMicrosoftLoginPage()
        {
            ValidatePage("login.microsoftonline.com");           
        }

        [When(@"'(.*)' with no upcoming hearings logs in with valid credentials")]
        public void WhenParticipantLogsInWithValidCredentialsButNoHearings(string user)
        {
            SetCurrentUserContext(user);
            DataSetUp.RemoveHearing(_testContext, new HearingsEndpoints());
            _loginPage.Logon(_testContext.CurrentUser.Username, _testContext.TestUserSecrets.TestUserPassword);
            _scenarioContext.Add("Participant", _testContext.CurrentUser.Role);
        }


        [Given(@"'(.*)' is provided with a way of viewing contact details")]
        
        [When(@"'(.*)' logs in with valid credentials")]
        public void WhenParticipantLogsInWithValidCredentials(string user)
        {
            AdminOnMicrosoftLoginPage();

            SetCurrentUserContext(user);
            _loginPage.Logon(_testContext.CurrentUser.Username, _testContext.TestUserSecrets.TestUserPassword);
            _scenarioContext.Add("Participant", _testContext.CurrentUser.Role);         
        }

        private void SetCurrentUserContext(string user)
        {
            if (_testContext.CurrentUser != null) return;
            switch (user)
            {
                case "Individual": _testContext.CurrentUser = _testContext.GetIndividualUser(); break;
                case "Representative": _testContext.CurrentUser = _testContext.GetRepresentativeUser(); break;
                case "Case Admin": _testContext.CurrentUser = _testContext.GetCaseAdminUser(); break;
                case "Person": _testContext.CurrentUser = _testContext.GetNonAdminUser(); break;
                default: throw new ArgumentOutOfRangeException($"No user found with user type {user}");
            }
        }

        [When(@"Individual starts suitability questionnaire")]
        public void ThenIndividulStartsSuitabilityQuestionnaire()
        {
            _loginPage.SignInTitle();
        }

        private void ValidatePage(string url)
        {
            if (!string.IsNullOrEmpty(url))
            {
                _browserContext.Retry(() =>
                {
                    _browserContext.NgDriver.Url.Should().Contain(url);
                });
            }
        }

        [Then(@"Person should be redirected to Video Web")]
        [Then(@"Participant should be redirected to Video Web")]
        public void ThenIndividualUserShouldBeRedirectedToVideoWeb()
        {
            ValidatePage(_testContext.RedirectUrl);
        }
    }
}