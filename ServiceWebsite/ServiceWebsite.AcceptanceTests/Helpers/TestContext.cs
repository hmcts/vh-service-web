using System.Collections.Generic;
using AcceptanceTests.Common.Api.Hearings;
using AcceptanceTests.Common.Data.Time;
using AcceptanceTests.Common.Driver.Drivers;
using ServiceWebsite.AcceptanceTests.Configuration;
using ServiceWebsite.AcceptanceTests.Data;
using TestApi.Contract.Dtos;

namespace ServiceWebsite.AcceptanceTests.Helpers
{
    public class TestContext
    {
        public TestApiManager Api { get; set; }
        public UserDto CurrentUser { get; set; }
        public DriverSetup Driver { get; set; }
        public ServiceWebConfig WebConfig { get; set; }
        public Test Test { get; set; }
        public string TestApiBearerToken { get; set; }
        public TimeZone TimeZone { get; set; }
        public List<UserDto> Users { get; set; }
    }
}
