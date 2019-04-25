using FluentAssertions;
using System;
using TechTalk.SpecFlow;
using ServiceWebsite.AcceptanceTests.Helpers;
using NUnit.Framework;
using ServiceWebsite.AcceptanceTests.Pages;

namespace ServiceWebsite.AcceptanceTests.Hooks
{
    [Binding]
    public sealed class Browser
    {
        private readonly BrowserContext _browserContext;
        private readonly MicrosoftLoginPage _website;
        private readonly SauceLabsSettings _saucelabsSettings;
        private readonly ScenarioContext _scenarioContext;
        private readonly FeatureContext _featureContext;

        public Browser(BrowserContext browserContext, MicrosoftLoginPage website, ScenarioContext scenarioContext, FeatureContext featureContext)
        {
            _browserContext = browserContext;
            _website = website;
            _saucelabsSettings = new SauceLabsSettings();
            _scenarioContext = scenarioContext;
            _featureContext = featureContext;
        }

        private TargetBrowser GetTargetBrowser()
        {
            TargetBrowser targetTargetBrowser;
            return Enum.TryParse(TestContext.Parameters["TargetBrowser"], true, out targetTargetBrowser) ? targetTargetBrowser : TargetBrowser.Chrome;
        }

        [BeforeScenario]
        public void BeforeScenario()
        {
            var apiTestContext = new ApiTestContext();
            var environment = new SeleniumEnvironment(_saucelabsSettings, _scenarioContext.ScenarioInfo, GetTargetBrowser());
            _browserContext.BrowserSetup(apiTestContext.Settings.WebsiteUrl, environment);
            _browserContext.LaunchSite();
            _browserContext.Retry(() =>
                {
                    _browserContext.PageUrl().Should().Contain("login.microsoftonline.com");
                }, 10);
            
            string userType = _featureContext.FeatureInfo.Tags[0];
            string professionalUser = apiTestContext.Settings.Professional1Email;
            string CitizenUser = apiTestContext.Settings.Citizen2Email;
            string userPassword = apiTestContext.Settings.Password;
            string caseNumber = null;

            switch (userType)
            {
                case "ProfessionalUser":
                    _website.Logon(professionalUser, userPassword);                   
                   // caseNumber = TestsBase.GetHearingsFor(professionalUser).FirstOrDefault().CaseNumber;
                    break;
                case "CitizenUser":
                    _website.Logon(CitizenUser, userPassword);
                   // caseNumber = TestsBase.GetHearingsFor(CitizenUser).FirstOrDefault().CaseNumber;
                    break;
                case "NonParticipants":
                    string nonParticipant = _scenarioContext.ScenarioInfo.Tags[0];
                    switch (nonParticipant)
                    {
                        case "Admin": _website.Logon(apiTestContext.Settings.AdminEmail, userPassword);
                            break;
                        case "Judge": _website.Logon(apiTestContext.Settings.JudgeEmail, userPassword);
                            break;
                        case "Clerk": _website.Logon(apiTestContext.Settings.ClerkEmail, userPassword);
                            break;
                    }
                    break;
            }
            _browserContext.Items.AddOrUpdate("CaseNumber", caseNumber);
        }

        [AfterScenario]
        public void AfterScenario()
        {
            if (_saucelabsSettings.RunWithSaucelabs)
            {
                bool passed = _scenarioContext.TestError == null;
                SaucelabsResult.LogPassed(passed, _browserContext.NgDriver);
            }

            try
            {
                _browserContext.LogOut();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Cannot logout from application:  {ex}");
            }            
            _browserContext.BrowserTearDown();            
        }
    }
}