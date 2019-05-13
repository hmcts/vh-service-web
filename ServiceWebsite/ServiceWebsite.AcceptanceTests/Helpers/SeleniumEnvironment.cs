using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Remote;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Helpers
{
    public class SeleniumEnvironment
    {
        private readonly SauceLabsSettings _saucelabsSettings;
        private readonly ScenarioInfo _scenario;
        private readonly TargetBrowser _targetBrowser;

        public SeleniumEnvironment(SauceLabsSettings saucelabsSettings, ScenarioInfo scenario, TargetBrowser targetBrowser)
        {
            _saucelabsSettings = saucelabsSettings;
            _scenario = scenario;
            _targetBrowser = targetBrowser;
        }

        public IWebDriver GetDriver()
        {
            return _saucelabsSettings.RunWithSaucelabs ? InitSauceLabsDriver() : InitLocalDriver();
        }

        private IWebDriver InitSauceLabsDriver()
        {
#pragma warning disable 618
            // disable warning of using desired capabilities

            var caps = new DesiredCapabilities();
            switch (_targetBrowser)
            {
                case TargetBrowser.Chrome:
                    if (!BlockCameraAndMic)
                    {
                        var chromeOptions = new Dictionary<string, object>();
                        chromeOptions["args"] = new List<string>
                        { "use-fake-ui-for-media-stream", "use-fake-device-for-media-stream"};
                        caps.SetCapability(ChromeOptions.Capability, chromeOptions);
                    }
                    caps.SetCapability("browserName", "Chrome");
                    caps.SetCapability("platform", "Windows 10");
                    caps.SetCapability("version", "74.0");
                    caps.SetCapability("autoAcceptAlerts", true);
                    break;
                case TargetBrowser.Safari:
                    caps.SetCapability("browserName", "Safari");
                    caps.SetCapability("platform", "macOS 10.14");
                    caps.SetCapability("version", "12.0");
                    break;
                case TargetBrowser.Edge:
                    caps.SetCapability("browserName", "MicrosoftEdge");
                    caps.SetCapability("platform", "Windows 10");
                    caps.SetCapability("version", "16.16299");
                    break;
                case TargetBrowser.IPhoneSafari:
                    caps.SetCapability("appiumVersion", "1.9.1");
                    caps.SetCapability("deviceName", "iPhone 8 Simulator");
                    caps.SetCapability("deviceOrientation", "portrait");
                    caps.SetCapability("platformVersion", "12.0");
                    caps.SetCapability("platformName", "iOS");
                    caps.SetCapability("browserName", "Safari");
                    break;
                default:
                    if (!BlockCameraAndMic)
                    {
                        var profile = new FirefoxProfile();
                        profile.SetPreference("use-fake-ui-for-media-stream", true);
                        caps.SetCapability(FirefoxDriver.ProfileCapabilityName, profile);
                    }
                    caps.SetCapability("browserName", "Firefox");
                    caps.SetCapability("platform", "Windows 10");
                    caps.SetCapability("version", "latest");
                    caps.SetCapability("autoAcceptAlerts", true);
                    break;
            }

            caps.SetCapability("name", _scenario.Title);
            caps.SetCapability("build", Environment.GetEnvironmentVariable("Build_DefinitionName") + "  " + Environment.GetEnvironmentVariable("BUILD_BUILDNUMBER"));
#pragma warning restore 618

            // It can take quite a bit of time for some commands to execute remotely so this is higher than default
            var commandTimeout = TimeSpan.FromMinutes(3);

            var remoteUrl = new System.Uri(_saucelabsSettings.RemoteServerUrl);

            return new RemoteWebDriver(remoteUrl, caps, commandTimeout);
        }

        private IWebDriver InitLocalDriver()
        {
            var options = new FirefoxOptions
            {
                AcceptInsecureCertificates = true
            };
            if (BlockCameraAndMic)
            {
                options.SetPreference("permissions.default.microphone", 2);
            }
            else
            {
                options.SetPreference("media.navigator.streams.fake", true);
            }
            return new FirefoxDriver(FireFoxDriverPath, options);
        }

        private string FireFoxDriverPath
        {
            get
            {
                const string osxPath = "/usr/local/bin";
                string assemblyPath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
                return Directory.Exists(osxPath) ? osxPath : assemblyPath;
            }
        }
        private bool BlockCameraAndMic => HasTag("BlockCameraAndMic");

        private bool HasTag(string tagName)
        {
            return _scenario.Tags.Any(tag => tag.Equals(tagName, StringComparison.CurrentCultureIgnoreCase));
        }
    }
}