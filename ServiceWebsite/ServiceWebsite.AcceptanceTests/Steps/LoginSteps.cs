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
        public LoginSteps(BrowserContext browserContext, MicrosoftLoginPage loginPage,
            ScenarioContext injectedContext, TestContext testContext)
        {
            _browserContext = browserContext;
            _loginPage = loginPage;
            _scenarioContext = injectedContext;
            _testContext = testContext;
        }
        public void AdminOnMicrosoftLoginPage()
        {
            _browserContext.Retry(() =>
            {
                _browserContext.PageUrl().Should().Contain("login.microsoftonline.com");
            }, 10);
        }
        [When(@"(.*) logs in with valid credentials")]
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

        [Then(@"Individul starts suitability questionnaire")]
        public void ThenIndividulStartsSuitabilityQuestionnaire()
        {
            _loginPage.SignInTitle();
        }
    }
}