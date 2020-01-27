using System.Collections.Generic;
using AcceptanceTests.Common.Configuration.Users;
using AcceptanceTests.Common.Driver;
using ServiceWebsite.AcceptanceTests.Configuration;
using ServiceWebsite.AcceptanceTests.Data;

namespace ServiceWebsite.AcceptanceTests.Helpers
{
    public class TestContext
    {
        public ServiceWebConfig ServiceWebConfig { get; set; }
        public ServiceWebTokens Tokens { get; set; }
        public DriverSetup Driver { get; set; }
        public UserAccount CurrentUser { get; set; }
        public List<UserAccount> UserAccounts { get; set; }
        public Test Test { get; set; }
    }
}
