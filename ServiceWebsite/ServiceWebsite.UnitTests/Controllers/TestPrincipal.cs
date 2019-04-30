using System.Security.Claims;

namespace ServiceWebsite.UnitTests.Controllers
{
    /// <summary>
    /// Mock class to ease testing of identity services
    /// </summary>
    public class TestPrincipal : ClaimsPrincipal 
    {
        public TestPrincipal(string username, params Claim[] claims) : base(new TestIdentity(username, claims))
        {
        }
    }
}