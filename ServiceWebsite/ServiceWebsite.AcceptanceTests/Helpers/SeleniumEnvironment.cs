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
        private const string TabletUserAgent =
           "Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.25 (KHTML, like Gecko) Version/11.0 Mobile/15A5304j Safari/604.1";
        private const string MobileUserAgent =
            "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1";
        private const string TabletUserAgentFF = "Mozilla / 5.0(iPad; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) FxiOS/1.0 Mobile/12F69 Safari/600.1.4";
        private const string MobileUserAgentFF = "Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) FxiOS/1.0 Mobile/12F69 Safari/600.1.4";
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
                case TargetBrowser.Firefox:
                    if (!BlockCameraAndMic)
                    {
                        var profile = new Dictionary<string, object>
                        {
                            ["args"] = new List<string>
                            { "use-fake-ui-for-media-stream", "use-fake-device-for-media-stream", "media.navigator.streams.fake"}
                        };
                        caps.SetCapability(FirefoxDriver.ProfileCapabilityName, profile);
                    }
                    caps.SetCapability("browserName", "Firefox");
                    caps.SetCapability("platform", "Windows 10");
                    caps.SetCapability("version", "latest");
                    caps.SetCapability("autoAcceptAlerts", true);
                    break;
                default:
                    if (TestMobile || TestTablet)
                    {
                        var chromeOptions = new Dictionary<string, object>();
                        var agent = TestMobile ? MobileUserAgent : TabletUserAgent;
                        Console.WriteLine("Will be running with chrome using user agent: " + agent);
                        chromeOptions["args"] = new List<string> { "--user-agent=" + agent };
                        caps.SetCapability(ChromeOptions.Capability, chromeOptions);
                    }

                    caps.SetCapability("browserName", "Chrome");
                    caps.SetCapability("platform", "Windows 10");
                    caps.SetCapability("version", "71.0");
                    break;
            }

            caps.SetCapability("name", _scenario.Title);
            caps.SetCapability("build", $"{Environment.GetEnvironmentVariable("Build_DefinitionName")} {Environment.GetEnvironmentVariable("RELEASE_RELEASENAME")}");
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

            if (TestMobileFF || TestTabletFF)
            {
                var agent = TestMobileFF ? MobileUserAgentFF : TabletUserAgentFF;
                Console.WriteLine("Will be running with fire fox using user agent: " + agent);
                options.SetPreference("general.useragent.override", agent);
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
        private bool TestMobile => HasTag("Mobile");
        private bool TestTablet => HasTag("Tablet");
        private bool TestMobileFF => HasTag("MobileFF");
        private bool TestTabletFF => HasTag("TabletFF");

        private bool HasTag(string tagName)
        {
            return _scenario.Tags.Any(tag => tag.Equals(tagName, StringComparison.CurrentCultureIgnoreCase));
        }
    }
}
