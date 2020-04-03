using System.Collections.Generic;
using AcceptanceTests.Common.Configuration.Users;
using AcceptanceTests.Common.Data.Time;
using AcceptanceTests.Common.Driver;
using ServiceWebsite.AcceptanceTests.Configuration;
using ServiceWebsite.AcceptanceTests.Data;

namespace ServiceWebsite.AcceptanceTests.Helpers
{
    public class TestContext
    {
        public Apis Apis { get; set; }
        public UserAccount CurrentUser { get; set; }
        public DriverSetup Driver { get; set; }
        public ServiceWebConfig ServiceWebConfig { get; set; }
        public Test Test { get; set; }
        public TimeZone TimeZone { get; set; }
        public ServiceWebTokens Tokens { get; set; }
        public List<UserAccount> UserAccounts { get; set; }
    }
}
