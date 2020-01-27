using AcceptanceTests.Common.Configuration;
using AcceptanceTests.Common.Data.TestData;
using AcceptanceTests.Common.Driver.Support;
using ServiceWebsite.AcceptanceTests.Data.TestData;

namespace ServiceWebsite.AcceptanceTests.Configuration
{
    public class ServiceWebTestConfig : ITestSettingsConfig
    {
        public string TestUsernameStem { get; set; }
        public string TestUserPassword { get; set; }
        public TargetBrowser TargetBrowser { get; set; }
        public TargetDevice TargetDevice { get; set; }
        public CommonData CommonData { get; set; }
        public DefaultData TestData { get; set; }
    }
}
