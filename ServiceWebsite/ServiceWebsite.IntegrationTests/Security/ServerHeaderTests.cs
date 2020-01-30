using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using ServiceWebsite.IntegrationTests.Controller;

namespace ServiceWebsite.IntegrationTests.Security
{
    public class ServerHeaderTests : ControllerTestsBase
    {
        private const string Uri = "https://localhost:5200/api/config";
        
        //[Test]
        public async Task Should_return_no_sniff_header()
        {
            var headerName = "X-Content-Type-Options";
            var headerValue = "nosniff";
            var response = await SendGetRequestAsync(Uri);
            var headers = response.Headers.GetValues(headerName).ToList();
            headers.Should().NotBeEmpty();
            headers.Contains(headerValue).Should().BeTrue();
        }
        
        //[Test]
        public async Task Should_return_xss_protection_header()
        {
            var headerName = "X-Xss-Protection";
            var headerValue = "1; mode=block";
            var response = await SendGetRequestAsync(Uri);
            var headers = response.Headers.GetValues(headerName).ToList();
            headers.Should().NotBeEmpty();
            headers.Contains(headerValue).Should().BeTrue();
        }
        
        //[Test]
        public async Task Should_return_cache_control_headers()
        {
            var response = await SendGetRequestAsync(Uri);
            var cacheControl = response.Headers.CacheControl;
            cacheControl.NoCache.Should().BeTrue();
            cacheControl.NoStore.Should().BeTrue();
        }
    }
}