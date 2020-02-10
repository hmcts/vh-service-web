using System.Collections.Generic;
using AcceptanceTests.Common.Driver;
using AcceptanceTests.Common.Driver.Browser;
using BoDi;
using ServiceWebsite.AcceptanceTests.Helpers;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Hooks
{
    [Binding]
    public class DriverHooks
    {
        private readonly DriverManager _driverManager;
        private Dictionary<string, UserBrowser> _browsers;
        private readonly IObjectContainer _objectContainer;

        public DriverHooks(IObjectContainer objectContainer)
        {
            _objectContainer = objectContainer;
            _driverManager = new DriverManager();
        }

        [BeforeScenario(Order = (int)HooksSequence.InitialiseBrowserHooks)]
        public void InitialiseBrowserContainer()
        {
            _browsers = new Dictionary<string, UserBrowser>();
            _objectContainer.RegisterInstanceAs(_browsers);
        }

        [BeforeScenario(Order = (int)HooksSequence.ConfigureDriverHooks)]
        public void ConfigureDriver(TestContext context, ScenarioContext scenarioContext)
        {
            context.ServiceWebConfig.TestConfig.TargetBrowser = _driverManager.GetTargetBrowser(NUnit.Framework.TestContext.Parameters["TargetBrowser"]);
            context.ServiceWebConfig.TestConfig.TargetDevice = _driverManager.GetTargetDevice(NUnit.Framework.TestContext.Parameters["TargetDevice"]);
            _driverManager.KillAnyLocalDriverProcesses(context.ServiceWebConfig.TestConfig.TargetBrowser, context.ServiceWebConfig.SauceLabsConfiguration.RunningOnSauceLabs());
            context.Driver = new DriverSetup(context.ServiceWebConfig.SauceLabsConfiguration, scenarioContext.ScenarioInfo, context.ServiceWebConfig.TestConfig.TargetBrowser);
        }

        [AfterScenario]
        public void AfterScenario(TestContext context, ScenarioContext scenarioContext)
        {
            _driverManager.RunningOnSauceLabs(context.ServiceWebConfig.SauceLabsConfiguration.RunningOnSauceLabs());
            _driverManager.LogTestResult(
                _browsers.Count > 0 ? _browsers[context.CurrentUser.Key].Driver : context.Driver.GetDriver(""),
                scenarioContext.TestError == null);
            _driverManager.TearDownBrowsers(_browsers);
            _driverManager.KillAnyLocalDriverProcesses(context.ServiceWebConfig.TestConfig.TargetBrowser, context.ServiceWebConfig.SauceLabsConfiguration.RunningOnSauceLabs());
        }
    }
}
