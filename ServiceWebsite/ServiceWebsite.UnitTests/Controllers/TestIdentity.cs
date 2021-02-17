using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace ServiceWebsite.UnitTests.Controllers
{
    /// <summary>
    /// Mock class to ease testing of identity services
    /// </summary>
    public class TestIdentity : ClaimsIdentity
    {
        public TestIdentity(string username, params Claim[] claims) : base(WithNameClaim(username, claims)) {}

        private static IEnumerable<Claim> WithNameClaim(string username, IEnumerable<Claim> claims)
        {
            var nameClaim = new Claim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name", username);
            return new[] { nameClaim }.Concat(claims);
        }
    }
}