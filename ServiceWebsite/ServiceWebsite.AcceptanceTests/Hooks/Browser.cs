using TechTalk.SpecFlow;
using System;
using ServiceWebsite.AcceptanceTests.Helpers;
using BoDi;
using ServiceWebsite.AcceptanceTests.NuGet.Contexts;

namespace AdminWebsite.AcceptanceTests.Hooks
{
    [Binding]
    public sealed class Browser
    {
        private readonly BrowserContext _browserContext;
        private readonly TestContextBase _testContext;
        private readonly SauceLabsSettings _saucelabsSettings;
        private readonly ScenarioContext _scenarioContext;        

        public Browser(BrowserContext browserContext, SauceLabsSettings saucelabsSettings,
            ScenarioContext injectedContext, TestContextBase testContext)
        {
            _testContext = testContext;
            _browserContext = browserContext;
            _saucelabsSettings = saucelabsSettings;
            _scenarioContext = injectedContext;
        }


        private TargetBrowser GetTargetBrowser()
        {
            TargetBrowser targetTargetBrowser;
            return Enum.TryParse(NUnit.Framework.TestContext.Parameters["TargetBrowser"], true, out targetTargetBrowser) ? targetTargetBrowser : TargetBrowser.Chrome;
        }

        [BeforeScenario (Order = 4)]
        public void BeforeScenario()
        {
            var environment = new SeleniumEnvironment(_saucelabsSettings, _scenarioContext.ScenarioInfo, GetTargetBrowser());
            _browserContext.BrowserSetup(_testContext.BaseUrl, environment);
            _browserContext.LaunchSite();           
        }

        [AfterScenario(Order = 0)]
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