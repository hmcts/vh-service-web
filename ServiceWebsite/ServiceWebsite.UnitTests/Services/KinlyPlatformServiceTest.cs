using FluentAssertions;
using Moq;
using NUnit.Framework;
using ServiceWebsite.Common;
using ServiceWebsite.Common.Security;
using ServiceWebsite.Domain;
using ServiceWebsite.Services;
using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace ServiceWebsite.UnitTests.Services
{
    [TestFixture]
    public class KinlyPlatformServiceTest
    {
        private readonly FakeHttpMessageHandler _fakeHttpHandler;
        private readonly string _kinlySelfTestScoreEndpointUrl;

        private readonly KinlyPlatformService _kinlyPlatformService;

        public KinlyPlatformServiceTest()
        {
            _fakeHttpHandler = new FakeHttpMessageHandler();
            _kinlySelfTestScoreEndpointUrl = "https://someUrl.com";

            _kinlyPlatformService = new KinlyPlatformService
            (
                new HttpClient(_fakeHttpHandler) { Timeout = TimeSpan.FromSeconds(1) },
                new Mock<ICustomJwtTokenProvider>().Object,
                _kinlySelfTestScoreEndpointUrl
            );
        }

        [Test]
        public void GetTestCallScoreAsync_throws_not_found_exception()
        {
            var participantId = Guid.NewGuid();
            _fakeHttpHandler.Register
            (
                $"{_kinlySelfTestScoreEndpointUrl}/{participantId}",
                new HttpResponseMessage(HttpStatusCode.NotFound)
            );

            Assert.ThrowsAsync<NotFoundException>(() => _kinlyPlatformService.GetTestCallScoreAsync(participantId));
        }

        [Test]
        public async Task GetTestCallScoreAsync_returns_successful_test_score_result()
        {
            var participantId = Guid.NewGuid();
            _fakeHttpHandler.Register
            (
                $"{_kinlySelfTestScoreEndpointUrl}/{participantId}",
                new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new StringContent("{'passed':true,'score':1}")
                }
            );

            var result = await _kinlyPlatformService.GetTestCallScoreAsync(participantId);

            var testCallResult = result.Should().NotBeNull().And.Subject.As<TestCallResult>();
            testCallResult.Passed.Should().BeTrue();
            testCallResult.Score.Should().Be(TestScore.Good);
        }
    }
}