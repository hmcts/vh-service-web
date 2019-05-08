using ServiceWebsite.AcceptanceTests.Contexts;
using ServiceWebsite.AcceptanceTests.Pages;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public class LoginSteps
    {
        private readonly CommonPages _commonPages;
        private readonly MicrosoftLoginPage _loginPage;
        private readonly ScenarioContext _scenarioContext;
        private readonly TestContext _testContext;
        public LoginSteps(CommonPages commonPages, MicrosoftLoginPage loginPage,
            ScenarioContext injectedContext, TestContext testContext)
        {
            _loginPage = loginPage;
            _scenarioContext = injectedContext;
            _testContext = testContext;
            _commonPages = commonPages;
        }
        public void AdminOnMicrosoftLoginPage()
        {
            _commonPages.ValidatePage("login.microsoftonline.com");           
        }
        [Given(@"(.*) logs in with valid credentials")]
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
        [When(@"Individual starts suitability questionnaire")]
        public void ThenIndividulStartsSuitabilityQuestionnaire()
        {
            _loginPage.SignInTitle();
        }
        [Then(@"Representative should be unauthorised")]
        public void ThenRepresentativeShouldBeUnauthorised()
        {
            _commonPages.ValidatePage("/error");
        }
    }
}