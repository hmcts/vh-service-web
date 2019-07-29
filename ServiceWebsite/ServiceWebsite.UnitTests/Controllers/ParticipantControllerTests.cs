using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using ServiceWebsite.Common;
using ServiceWebsite.Controllers;
using ServiceWebsite.Domain;
using ServiceWebsite.Models;
using ServiceWebsite.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using TestScore = ServiceWebsite.Domain.TestScore;

namespace ServiceWebsite.UnitTests.Controllers
{
    public class ParticipantControllerTests
    {
        private const string Username = "some.user@hearings.reform.hmcts.net";
        private readonly Guid _hearingId = Guid.NewGuid();
        private ParticipantController _controller;
        private Mock<IHearingsService> _hearingService;
        private Mock<IParticipantService> _participantService;
        private Mock<IKinlyPlatformService> _kinlyPlatformService;

        [SetUp]
        public void Setup()
        {
            _hearingService = new Mock<IHearingsService>();
            _participantService = new Mock<IParticipantService>();
            _kinlyPlatformService = new Mock<IKinlyPlatformService>();

            _controller = new ParticipantController(_hearingService.Object, _participantService.Object, _kinlyPlatformService.Object);
            _controller.MockUserIdentity(Username);
        }

        [Test]
        public async Task should_return_badrequest_if_hearingId_is_empty()
        {
            var result = await _controller.UpdateSuitabilityAnswers(Guid.Empty, new System.Collections.Generic.List<HearingSuitabilityAnswer>());
            var badRequestObjectResult = (BadRequestObjectResult)result;
            Assert.AreEqual(400, badRequestObjectResult.StatusCode);
            Assert.AreEqual(badRequestObjectResult.Value, $"Please provide a valid hearing id");
        }

        [Test]
        public async Task should_return_not_found_if_no_hearing_for_user_is_found()
        {
            var answers = new List<HearingSuitabilityAnswer> { new HearingSuitabilityAnswer() { QuestionKey = "TEST_KEY", Answer = "Test Answer", ExtendedAnswer = "Test Extended Answer" } };
            // given service returns
            _hearingService.Setup(x => x.GetParticipantIdAsync(Username, _hearingId))
                .ThrowsAsync(new NotFoundException("message"));
            var result = (NotFoundObjectResult)await _controller.UpdateSuitabilityAnswers(_hearingId, answers);
            Assert.AreEqual(404, result.StatusCode);
        }

        [Test]
        public async Task should_return_unauthorized_for_hearing_the_user_is_not_participant_in()
        {
            var answers = new List<HearingSuitabilityAnswer> { new HearingSuitabilityAnswer() { QuestionKey = "TEST_KEY", Answer = "Test Answer", ExtendedAnswer = "Test Extended Answer" } };
            // given service throws
            _hearingService.Setup(x => x.GetParticipantIdAsync(Username, _hearingId)).ReturnsAsync(new Guid?());
            var result = (UnauthorizedObjectResult)await _controller.UpdateSuitabilityAnswers(_hearingId, answers);
            Assert.AreEqual(result.Value, $"User is not a participant of hearing with id '{_hearingId}'");
        }

        [Test]
        public async Task should_return_badrequest_if_question_key_format_is_incorrect()
        {
            var answers = new List<HearingSuitabilityAnswer> { new HearingSuitabilityAnswer() { QuestionKey = "incorrect_key", Answer = "Test Answer", ExtendedAnswer = "Test Extended Answer" } };
            var result = (BadRequestObjectResult)await _controller.UpdateSuitabilityAnswers(_hearingId, answers);
            Assert.AreEqual(400, result.StatusCode);
            Assert.AreEqual(result.Value, $"Please provide a valid answer key");
        }

        [Test]
        public async Task should_return_badrequest_if_answers_length_is_zero()
        {
            var result = (BadRequestObjectResult)await _controller.UpdateSuitabilityAnswers(_hearingId, new System.Collections.Generic.List<HearingSuitabilityAnswer>());
            Assert.AreEqual(400, result.StatusCode);
            Assert.AreEqual(result.Value, $"Please provide valid answers");
        }

        [Test]
        public async Task should_return_ok_if_suitability_answers_updated_successfully()
        {
            var answers = new List<HearingSuitabilityAnswer> { new HearingSuitabilityAnswer() { QuestionKey = "TEST_KEY", Answer = "Test Answer", ExtendedAnswer = "Test Extended Answer" } };

            _hearingService.Setup(x => x.GetParticipantIdAsync(Username, _hearingId)).ReturnsAsync((Guid?)Guid.NewGuid());

            var result = (NoContentResult)await _controller.UpdateSuitabilityAnswers(_hearingId, answers);
            Assert.AreEqual(204, result.StatusCode);
        }

        [Test]
        public async Task should_return_not_found_if_participant_is_found()
        {
            const string username = "SomeUnknownUsername";

            _participantService
                .Setup(x => x.GetParticipantsByUsernameAsync(username))
                .ReturnsAsync(Enumerable.Empty<Participant>());

            var result = await _controller.GetCurrentParticipant();

            Assert.NotNull(result);
            Assert.IsAssignableFrom<NotFoundResult>(result);
        }

        [Test]
        public async Task should_return_ok_if_participant_is_found()
        {
            var participants = new List<Participant>
            {
                new Participant {Id = Guid.NewGuid(), Username = "one"},
                new Participant {Id = Guid.NewGuid(), Username = "two"},
                new Participant {Id = Guid.NewGuid(), Username = "three"}
            };

            _participantService
                .Setup(x => x.GetParticipantsByUsernameAsync(Username))
                .ReturnsAsync(participants);

            var result = await _controller.GetCurrentParticipant();

            Assert.NotNull(result);
            Assert.IsAssignableFrom<OkObjectResult>(result);
            var okResult = (OkObjectResult)result;
            Assert.IsAssignableFrom<ParticipantResponse>(okResult.Value);
            var response = (ParticipantResponse)okResult.Value;
            Assert.AreEqual("one", response.Username);
        }

        [Test]
        public async Task should_return_not_found_if_no_test_score_is_not_found()
        {
            _kinlyPlatformService
                .Setup(x => x.GetTestCallScoreAsync(It.IsAny<Guid>()))
                .ThrowsAsync(new NotFoundException("any"));

            var result = await _controller.GetTestCallResultForParticipant(Guid.NewGuid());

            Assert.NotNull(result);
            Assert.IsAssignableFrom<NotFoundObjectResult>(result);
        }

        [Test]
        public async Task should_return_ok_if_no_test_score_is_found()
        {
            var expectedResult = new TestCallResult(true, TestScore.Good);

            _kinlyPlatformService
                .Setup(x => x.GetTestCallScoreAsync(It.IsAny<Guid>()))
                .ReturnsAsync(expectedResult);

            var result = await _controller.GetTestCallResultForParticipant(Guid.NewGuid());

            Assert.NotNull(result);
            Assert.IsAssignableFrom<OkObjectResult>(result);
            result.Should().BeAssignableTo<OkObjectResult>().Subject.Value.Should().Be(expectedResult);
        }
    }
}