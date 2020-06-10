using AcceptanceTests.Common.Configuration;
using AcceptanceTests.Common.Data.TestData;
using AcceptanceTests.Common.Driver.Enums;
using ServiceWebsite.AcceptanceTests.Data.TestData;

namespace ServiceWebsite.AcceptanceTests.Configuration
{
    public class ServiceWebTestConfig : ITestSettingsConfig
    {
        public CommonData CommonData { get; set; }
        public TargetBrowser TargetBrowser { get; set; }
        public string TargetBrowserVersion { get; set; }
        public TargetDevice TargetDevice { get; set; }
        public string TargetDeviceName { get; set; }
        public TargetOS TargetOS { get; set; }
        public DefaultData TestData { get; set; }
        public string TestUsernameStem { get; set; }
        public string TestUserPassword { get; set; }
    }
}
