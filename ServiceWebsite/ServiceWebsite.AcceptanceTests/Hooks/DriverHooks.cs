using System.Collections.Generic;
using AcceptanceTests.Common.Configuration.Users;
using AcceptanceTests.Common.Data.Time;
using AcceptanceTests.Common.Driver;
using AcceptanceTests.Common.Driver.Browser;
using AcceptanceTests.Common.Driver.Support;
using BoDi;
using ServiceWebsite.AcceptanceTests.Helpers;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Hooks
{
    [Binding]
    public class DriverHooks
    {
        private Dictionary<string, UserBrowser> _browsers;
        private readonly IObjectContainer _objectContainer;

        public DriverHooks(IObjectContainer objectContainer)
        {
            _objectContainer = objectContainer;
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
            context.ServiceWebConfig.TestConfig.TargetBrowser = DriverManager.GetTargetBrowser(NUnit.Framework.TestContext.Parameters["TargetBrowser"]);
            context.ServiceWebConfig.TestConfig.TargetDevice = DriverManager.GetTargetDevice(NUnit.Framework.TestContext.Parameters["TargetDevice"]);
            DriverManager.KillAnyLocalDriverProcesses();
            var driverOptions = new DriverOptions()
            {
                TargetBrowser = context.ServiceWebConfig.TestConfig.TargetBrowser,
                TargetDevice = context.ServiceWebConfig.TestConfig.TargetDevice
            };
            context.Driver = new DriverSetup(context.ServiceWebConfig.SauceLabsConfiguration, scenarioContext.ScenarioInfo, driverOptions);
        }

        [BeforeScenario(Order = (int)HooksSequence.SetTimeZone)]
        public void SetTimezone(TestContext context)
        {
            context.TimeZone = new TimeZone(context.ServiceWebConfig.SauceLabsConfiguration.RunningOnSauceLabs(), context.ServiceWebConfig.TestConfig.TargetBrowser);
        }

        [AfterScenario(Order = (int)HooksSequence.LogResultHooks)]
        public void LogResult(TestContext context, ScenarioContext scenarioContext)
        {
            if (_browsers == null) return;
            if (_browsers.Count.Equals(0))
            {
                context.CurrentUser = UserManager.GetDefaultParticipantUser(context.UserAccounts);
                var browser = new UserBrowser(context.CurrentUser)
                    .SetBaseUrl(context.ServiceWebConfig.VhServices.ServiceWebUrl)
                    .SetTargetBrowser(context.ServiceWebConfig.TestConfig.TargetBrowser)
                    .SetDriver(context.Driver);
                _browsers.Add(context.CurrentUser.Key, browser);
            }

            DriverManager.LogTestResult(
                context.ServiceWebConfig.SauceLabsConfiguration.RunningOnSauceLabs(),
                _browsers[context.CurrentUser.Key].Driver,
                scenarioContext.TestError == null);
        }

        [AfterScenario(Order = (int)HooksSequence.TearDownBrowserHooks)]
        public void TearDownBrowser()
        {
            if (_browsers != null)
                DriverManager.TearDownBrowsers(_browsers);

            DriverManager.KillAnyLocalDriverProcesses();
        }

        [AfterScenario(Order = (int)HooksSequence.StopEdgeChromiumServer)]
        public void StopEdgeChromiumServer(TestContext context)
        {
            var targetBrowser = GetTargetBrowser();
            if (targetBrowser.ToLower().Equals(TargetBrowser.EdgeChromium.ToString().ToLower()) &&
                !context.ServiceWebConfig.SauceLabsConfiguration.RunningOnSauceLabs())
                _browsers?[context.CurrentUser.Key].StopEdgeChromiumServer();
        }

        private static string GetTargetBrowser()
        {
            return NUnit.Framework.TestContext.Parameters["TargetBrowser"] ?? "";
        }
    }
}
