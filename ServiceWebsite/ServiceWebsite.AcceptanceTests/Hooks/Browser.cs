using System;
using System.Diagnostics;
using AdminWebsite.AcceptanceTests.Hooks;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.NuGet.Contexts;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Hooks
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

        private static TargetBrowser GetTargetBrowser()
        {
            return Enum.TryParse(NUnit.Framework.TestContext.Parameters["TargetBrowser"], true, out TargetBrowser targetTargetBrowser) ? targetTargetBrowser : TargetBrowser.Chrome;
        }

        [BeforeScenario (Order = 4)]
        public void BeforeScenario()
        {
            var environment = new SeleniumEnvironment(_saucelabsSettings, _scenarioContext.ScenarioInfo, GetTargetBrowser());
            _browserContext.BrowserSetup(_testContext.WebsiteUrl, environment);
            _browserContext.LaunchSite();           
        }

        [AfterScenario(Order = 0)]
        public void AfterScenario()
        {
            if (_saucelabsSettings.RunWithSaucelabs)
            {
                var passed = _scenarioContext.TestError == null;
                SaucelabsResult.LogPassed(passed, _browserContext.NgDriver);
            }
            _browserContext.BrowserTearDown();

            var driverProcesses = Process.GetProcessesByName("GeckoDriver");

            foreach (var process in driverProcesses)
            {
                try
                {
                    process.Kill();
                }
                catch (Exception ex)
                {
                    NUnit.Framework.TestContext.WriteLine(ex.Message);
                }
            }
        }
    }
}