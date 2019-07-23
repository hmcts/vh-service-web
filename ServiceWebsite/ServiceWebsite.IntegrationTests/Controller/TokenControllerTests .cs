using FluentAssertions;
using NUnit.Framework;
using ServiceWebsite.IntegrationTests.Helpers;
using ServiceWebsite.Models;
using System;
using System.IO;
using System.Net;
using System.Text;

namespace ServiceWebsite.IntegrationTests.Controller
{
    public class TokenControllerTests : ControllerTestsBase
    {
        [Test]
        [Ignore("Barer token need to change")]
        public void Should_get_token_when_requested_with_correct_participantid()
        {
            var responseMessage = SendGetRequestWithBearerTokenAsync($"/participants/{Guid.NewGuid()}/token").Result;

            Stream receiveStream = responseMessage.Content.ReadAsStreamAsync().Result;
            StreamReader readStream = new StreamReader(receiveStream, Encoding.UTF8);
            var json = readStream.ReadToEnd();

            var tokenResponse = ApiRequestHelper.DeserialiseSnakeCaseJsonToResponse<TokenResponse>(json);

            responseMessage.StatusCode.Should().Be(HttpStatusCode.OK);
            tokenResponse.Should().NotBeNull();
            tokenResponse.Token.Should().NotBeEmpty();
        }

        [Test]
        [Ignore("Barer token need to change")]
        public void Should_return_bad_request_when_requested_with_incorrect_participantid()
        {
            var responseMessage = SendGetRequestWithBearerTokenAsync($"/participants/{Guid.Empty}/token").Result;
            responseMessage.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        }
    }
}