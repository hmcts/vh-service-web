using TechTalk.SpecFlow;
using System;
using ServiceWebsite.AcceptanceTests.Contexts;
using ServiceWebsite.AcceptanceTests.Helpers;

namespace AdminWebsite.AcceptanceTests.Hooks
{
    [Binding]
    public sealed class Browser
    {
        private readonly BrowserContext _browserContext;
        private readonly TestContext _testContext;
        private readonly SauceLabsSettings _saucelabsSettings;
        private readonly ScenarioContext _scenarioContext;        

        public Browser(BrowserContext browserContext, TestContext context, SauceLabsSettings saucelabsSettings,
            ScenarioContext injectedContext)
        {
            _browserContext = browserContext;
            _testContext = context;
            _saucelabsSettings = saucelabsSettings;
            _scenarioContext = injectedContext;
        }


        private TargetBrowser GetTargetBrowser()
        {
            TargetBrowser targetTargetBrowser;
            return Enum.TryParse(NUnit.Framework.TestContext.Parameters["TargetBrowser"], true, out targetTargetBrowser) ? targetTargetBrowser : TargetBrowser.Chrome;
        }

        [BeforeScenario (Order = 2)]
        public void BeforeScenario()
        {
            var environment = new SeleniumEnvironment(_saucelabsSettings, _scenarioContext.ScenarioInfo, GetTargetBrowser());
            _browserContext.BrowserSetup(_testContext.WebsiteUrl, environment);
            _browserContext.LaunchSite();           
        }

        [AfterScenario]
        public void AfterScenario()
        {
            if (_saucelabsSettings.RunWithSaucelabs)
            {
                bool passed = _scenarioContext.TestError == null;
                SaucelabsResult.LogPassed(passed, _browserContext.NgDriver);
            }
            _browserContext.BrowserTearDown();
        }
    }
}