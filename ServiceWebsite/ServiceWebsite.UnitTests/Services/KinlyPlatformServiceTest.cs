using System;
using System.Net;
using Moq;
using NUnit.Framework;
using ServiceWebsite.Common.Security;
using ServiceWebsite.Services;
using System.Net.Http;
using System.Threading.Tasks;
using FluentAssertions;
using ServiceWebsite.Common;
using ServiceWebsite.Domain;

namespace ServiceWebsite.UnitTests.Services
{
    [TestFixture]
    public class KinlyPlatformServiceTest
    {
        private readonly FakeHttpMessageHandler _fakeHandler;
        private readonly Mock<ICustomJwtTokenProvider> _CustomJwtTokenProvider;
        private readonly string _kinlySelfTestScoreEndpointUrl;

        private readonly KinlyPlatformService _kinlyPlatformService;

        public KinlyPlatformServiceTest()
        {
            _fakeHandler = new FakeHttpMessageHandler();
            _CustomJwtTokenProvider = new Mock<ICustomJwtTokenProvider>();
            _kinlySelfTestScoreEndpointUrl = "https://someUrl.com";

            _kinlyPlatformService = new KinlyPlatformService
            (
                new HttpClient(_fakeHandler) { Timeout = TimeSpan.FromMilliseconds(1000) },
                _CustomJwtTokenProvider.Object,
                _kinlySelfTestScoreEndpointUrl
            );
        }

        [Test]
        public void GetTestCallScoreAsync_throws_not_found_exception()
        {
            var participantId = Guid.NewGuid();
            _fakeHandler.Register
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
            _fakeHandler.Register
            (
                $"{_kinlySelfTestScoreEndpointUrl}/{participantId}", 
                new HttpResponseMessage(HttpStatusCode.Accepted)
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