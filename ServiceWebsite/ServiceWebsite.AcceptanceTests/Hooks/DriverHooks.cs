using System.Collections.Generic;
using System.Linq;
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
        public void ConfigureDriver(TestContext context, ScenarioContext scenario)
        {
            DriverManager.KillAnyLocalDriverProcesses();
            var browserAndVersion = GetBrowserAndVersion();
            context.ServiceWebConfig.TestConfig.TargetBrowser = GetTargetBrowser(browserAndVersion);
            context.ServiceWebConfig.TestConfig.TargetDevice = DriverManager.GetTargetDevice(NUnit.Framework.TestContext.Parameters["TargetDevice"]);

            var driverOptions = new DriverOptions()
            {
                TargetBrowser = context.ServiceWebConfig.TestConfig.TargetBrowser,
                TargetDevice = context.ServiceWebConfig.TestConfig.TargetDevice
            };

            var sauceLabsOptions = new SauceLabsOptions()
            {
                BrowserVersion = GetBrowserVersion(browserAndVersion),
                EnableLogging = EnableLogging(scenario.ScenarioInfo),
                Title = scenario.ScenarioInfo.Title
            };
            context.Driver = new DriverSetup(context.ServiceWebConfig.SauceLabsConfiguration, driverOptions, sauceLabsOptions);
        }

        private static string GetBrowserAndVersion()
        {
            return NUnit.Framework.TestContext.Parameters["TargetBrowser"] ?? "";
        }

        private static TargetBrowser GetTargetBrowser(string browserAndVersion)
        {
            return DriverManager.GetTargetBrowser(browserAndVersion.Contains(":") ? browserAndVersion.Split(":")[0] : browserAndVersion);
        }

        private static string GetBrowserVersion(string browserAndVersion)
        {
            return browserAndVersion.Contains(":") ? browserAndVersion.Split(":")[1] : "latest";
        }

        private static bool EnableLogging(ScenarioInfo scenario)
        {
            return !scenario.Tags.Contains("DisableLogging");
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
                var browser = new UserBrowser()
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
            var targetBrowser = GetBrowserAndVersion();
            if (targetBrowser.ToLower().Contains(TargetBrowser.EdgeChromium.ToString().ToLower()) &&
                !context.ServiceWebConfig.SauceLabsConfiguration.RunningOnSauceLabs())
                _browsers?[context.CurrentUser.Key].StopEdgeChromiumServer();
        }
    }
}
