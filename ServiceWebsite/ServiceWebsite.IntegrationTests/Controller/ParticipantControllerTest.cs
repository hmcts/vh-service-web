using FluentAssertions;
using NUnit.Framework;
using ServiceWebsite.Common;
using ServiceWebsite.Domain;
using System;
using System.Net;
using System.Threading.Tasks;

namespace ServiceWebsite.IntegrationTests.Controller
{
    public class ParticipantControllerTest : ControllerTestsBase
    {
        [Ignore("test")]
        [Test]
        public async Task should_get_self_test_result_for_participant()
        {
            var responseMessage = await SendGetRequestWithBearerTokenAsync($"/api/hearings/participants/{SuccessSelfTestScoreParticipantId}/selftestresult");

            var content = await responseMessage.Content.ReadAsStringAsync();
            var tokenResponse = ApiRequestHelper.DeserialiseSnakeCaseJsonToResponse<TestCallResult>(content);

            responseMessage.StatusCode.Should().Be(HttpStatusCode.OK);
            tokenResponse.Should().NotBeNull();
            tokenResponse.Passed.Should().BeTrue();
        }
    }
}