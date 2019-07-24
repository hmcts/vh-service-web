using FluentAssertions;
using NUnit.Framework;
using ServiceWebsite.Common;
using ServiceWebsite.Models;
using System;
using System.Net;

namespace ServiceWebsite.IntegrationTests.Controller
{
    public class TokenControllerTests : ControllerTestsBase
    {
        [Test]
        public void Should_get_token_when_requested_with_correct_participant_id()
        {
            var responseMessage = SendGetRequestWithBearerTokenAsync($"/participants/{Guid.NewGuid()}/token").Result;

            var content = responseMessage.Content.ReadAsStringAsync().Result;
            var tokenResponse = ApiRequestHelper.DeserialiseSnakeCaseJsonToResponse<TokenResponse>(content);

            responseMessage.StatusCode.Should().Be(HttpStatusCode.OK);
            tokenResponse.Should().NotBeNull();
            tokenResponse.Token.Should().NotBeEmpty();
        }

        [Test]
        public void Should_return_bad_request_when_requested_with_incorrect_participant_id()
        {
            var responseMessage = SendGetRequestWithBearerTokenAsync($"/participants/{Guid.Empty}/token").Result;
            responseMessage.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        }
    }
}