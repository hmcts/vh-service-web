using FluentAssertions;
using NUnit.Framework;
using ServiceWebsite.Helpers;
using System.Security.Claims;
namespace ServiceWebsite.UnitTests.Helper
{
    public class ClaimsHelperTest
    {
        [Test]
        public void Should_return_claim_value_oid()
        {

            var claimsAd = new[]
            {
             new Claim(ClaimTypes.Name, "username"),
             new Claim("oid", "oid")
            };

            var result = ClaimsHelper.FindAdId(claimsAd);
            result.Should().Be("oid");
        }

        [Test]
        public void Should_return_claim_value_unknown()
        {

            var claimsAd = new[]
            {
             new Claim(ClaimTypes.Name, "username"),
            };

            var result = ClaimsHelper.FindAdId(claimsAd);
            result.Should().Be("unknown");
        }
    }
}
