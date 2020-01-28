using FluentAssertions;
using NUnit.Framework;
using ServiceWebsite.Common;
using ServiceWebsite.Models;
using System.Net;
using System.Threading.Tasks;

namespace ServiceWebsite.IntegrationTests.Controller
{
    public class ConfigControllerTests : ControllerTestsBase
    {
        [Test]
        public async Task Should_retrieve_the_client_config_settings()
        {
            var response = await SendGetRequestAsync("api/config");
            response.StatusCode.Should().Be(HttpStatusCode.OK);
            var responseBody = await response.Content.ReadAsStringAsync();
            var settings = ApiRequestHelper.DeserialiseSnakeCaseJsonToResponse<ClientConfiguration>(responseBody);
            settings.Should().NotBeNull();
           
        }
    }
}