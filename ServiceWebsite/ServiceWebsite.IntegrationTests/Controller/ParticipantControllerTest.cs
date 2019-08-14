using FluentAssertions;
using NUnit.Framework;
using System.Net;
using System.Threading.Tasks;

namespace ServiceWebsite.IntegrationTests.Controller
{
    public class ParticipantControllerTest : ControllerTestsBase
    {
        [Test]
        public async Task should_get_self_test_result_with_message_participant_not_found()
        {
            var responseMessage = await SendGetRequestWithBearerTokenAsync($"/api/hearings/participants/{SuccessSelfTestScoreParticipantId}/selftestresult");

            var content = await responseMessage.Content.ReadAsStringAsync();
            responseMessage.StatusCode.Should().Be(HttpStatusCode.NotFound);
            content.Should().NotBeNull();
            content.Should().ContainAny("No test score result found for participant Id");
        }
    }
}