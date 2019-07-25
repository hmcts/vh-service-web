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
        public async Task should_be_redirected_to_microsoft_login_if_not_authenticated()
        {
            var response = await SendGetRequestAsync("https://localhost:5600/api/config");
            response.StatusCode.Should().Be(HttpStatusCode.OK);
            var responseBody = await response.Content.ReadAsStringAsync();
            var settings = ApiRequestHelper.DeserialiseSnakeCaseJsonToResponse<ClientConfiguration>(responseBody);
            settings.VideoAppUrl.Should().Contain("localhost");
            settings.BaseVideoUrl.Should().NotBeNullOrEmpty();
        }
    }
}