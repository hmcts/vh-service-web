using FluentAssertions;
using ServiceWebsite.AcceptanceTests.Contexts;
using ServiceWebsite.AcceptanceTests.Helpers;
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
        private readonly TestContext _testContext;
        public LoginSteps(MicrosoftLoginPage loginPage,
            ScenarioContext injectedContext, TestContext testContext, BrowserContext browserContext)
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
        [Given(@"'(.*)' is provided with a way of viewing contact details")]
        [When(@"'(.*)' with no upcoming hearings logs in with valid credentials")]
        [When(@"'(.*)' logs in with valid credentials")]
        public void WhenIndividualLogsInWithValidCredentials(string participant)
        {
            AdminOnMicrosoftLoginPage();
            var appSecrets = _testContext.TestUserSecrets;
            var password = appSecrets.Password;
            switch (participant)
            {
                case "Individual":
                    _loginPage.Logon(appSecrets.Individual, password);
                    _scenarioContext.Add("Username", appSecrets.Individual);
                    break;
                case "Representative":
                    _loginPage.Logon(appSecrets.Representative, password);
                    _scenarioContext.Add("Username", appSecrets.Representative);
                    break;
            }
            _scenarioContext.Add("Participant", participant);
        }
        [When(@"Individual starts suitability questionnaire")]
        public void ThenIndividulStartsSuitabilityQuestionnaire()
        {
            _loginPage.SignInTitle();
        }
        [Then(@"Representative should be unauthorised")]
        public void ThenRepresentativeShouldBeUnauthorised()
        {
            ValidatePage("/error");
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
        public void ThenIndividualUserShouldBeRedirectedToVideoWeb()
        {
            ValidatePage(_testContext.VideoAppUrl);
        }
    }
}