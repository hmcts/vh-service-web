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
        private const string Username = "some.user@hmcts.net";
        private readonly Guid _hearingId = Guid.NewGuid();
        private ParticipantController _controller;
        private Mock<IHearingsService> _hearingService;
        private Mock<IParticipantService> _participantService;
        private Mock<IKinlyPlatformService> _kinlyPlatformService;
        private Mock<IPollyRetryService> _pollyRetryService;
        private List<HearingSuitabilityAnswer> hearingSuitabilityAnswers;

        [SetUp]
        public void Setup()
        {
            _hearingService = new Mock<IHearingsService>();
            _participantService = new Mock<IParticipantService>();
            _kinlyPlatformService = new Mock<IKinlyPlatformService>();
            _pollyRetryService = new Mock<IPollyRetryService>();
            hearingSuitabilityAnswers = new List<HearingSuitabilityAnswer> { 
                                                new HearingSuitabilityAnswer() { 
                                                    QuestionKey = "TEST_KEY", 
                                                    Answer = "Test Answer", 
                                                    ExtendedAnswer = "Test Extended Answer" 
                                                } };

            _controller = new ParticipantController(_hearingService.Object, _participantService.Object, 
                _kinlyPlatformService.Object, _pollyRetryService.Object);
            _controller.MockUserIdentity(Username);
        }

        [Test]
        public async Task Should_return_badrequest_if_hearingId_is_empty()
        {
            var result = await _controller.UpdateSuitabilityAnswers(Guid.Empty, new System.Collections.Generic.List<HearingSuitabilityAnswer>());
            var badRequestObjectResult = (BadRequestObjectResult)result;
            Assert.AreEqual(400, badRequestObjectResult.StatusCode);
            Assert.AreEqual(badRequestObjectResult.Value, $"Please provide a valid hearing id");
        }

        [Test]
        public async Task Should_return_not_found_if_no_hearing_for_user_is_found()
        {
            _hearingService.Setup(x => x.GetParticipantIdAsync(Username, _hearingId))
                .ThrowsAsync(new NotFoundException("message"));

            var result = (NotFoundObjectResult)await _controller.UpdateSuitabilityAnswers(_hearingId, hearingSuitabilityAnswers);

            Assert.AreEqual(404, result.StatusCode);
        }

        [Test]
        public async Task Should_return_unauthorized_on_access_exception()
        {
            _hearingService.Setup(x => x.GetParticipantIdAsync(Username, _hearingId))
                .ThrowsAsync(new UnauthorizedAccessException("message"));

            var result = (UnauthorizedObjectResult)await _controller.UpdateSuitabilityAnswers(_hearingId, hearingSuitabilityAnswers);

            Assert.AreEqual(result.Value, $"User is not a participant of hearing with id '{_hearingId}'");
        }

        [Test]
        public async Task Should_return_unauthorized_for_hearing_the_user_is_not_participant_in()
        {
            _hearingService.Setup(x => x.GetParticipantIdAsync(Username, _hearingId)).ReturnsAsync(new Guid?());

            var result = (UnauthorizedObjectResult)await _controller.UpdateSuitabilityAnswers(_hearingId, hearingSuitabilityAnswers);

            Assert.AreEqual(result.Value, $"User is not a participant of hearing with id '{_hearingId}'");
        }

        [Test]
        public async Task Should_return_bad_request_if_question_key_format_is_incorrect()
        {
            hearingSuitabilityAnswers[0].QuestionKey = "incorrect_key";

            var result = (BadRequestObjectResult)await _controller.UpdateSuitabilityAnswers(_hearingId, hearingSuitabilityAnswers);

            Assert.AreEqual(400, result.StatusCode);
            Assert.AreEqual(result.Value, $"Please provide a valid answer key");
        }

        [Test]
        public async Task Should_return_bad_request_if_answers_length_is_zero()
        {
            var result = (BadRequestObjectResult)await _controller.UpdateSuitabilityAnswers(_hearingId, new System.Collections.Generic.List<HearingSuitabilityAnswer>());
            Assert.AreEqual(400, result.StatusCode);
            Assert.AreEqual(result.Value, $"Please provide valid answers");
        }

        [Test]
        public async Task Should_return_ok_if_suitability_answers_updated_successfully()
        {
            _hearingService.Setup(x => x.GetParticipantIdAsync(Username, _hearingId)).ReturnsAsync((Guid?)Guid.NewGuid());

            var result = (NoContentResult)await _controller.UpdateSuitabilityAnswers(_hearingId, hearingSuitabilityAnswers);

            Assert.AreEqual(204, result.StatusCode);
        }

        [Test]
        public async Task Should_return_ok_if_several_participant_with_the_same_username_return_from_database()
        {
            var participants = new List<Participant>
            {
                new Participant {Id = Guid.NewGuid(), Username = "SomeUsername"},
                new Participant {Id = Guid.NewGuid(), Username = "SomeUsername"},
            };
            _participantService
                .Setup(x => x.GetParticipantsByUsernameAsync(It.IsAny<string>()))
                .ReturnsAsync(participants);

            var result = await _controller.GetCurrentParticipant();

            Assert.NotNull(result);
            Assert.IsAssignableFrom<OkObjectResult>(result);
            var okResult = (OkObjectResult)result;
            Assert.IsAssignableFrom<ParticipantResponse>(okResult.Value);
            var response = (ParticipantResponse)okResult.Value;
            Assert.AreEqual("SomeUsername", response.Username);
            Assert.AreEqual(participants[0].Id, response.Id);

        }

        [Test]
        public async Task Should_return_not_found_if_participant_is_not_found()
        {
            _participantService
                .Setup(x => x.GetParticipantsByUsernameAsync(It.IsAny<string>()))
                .ReturnsAsync(Enumerable.Empty<Participant>());

            var result = await _controller.GetCurrentParticipant();

            Assert.NotNull(result);
            Assert.IsAssignableFrom<NotFoundResult>(result);
        }


        [Test]
        public async Task Should_return_not_found_if_participant_is_null()
        {
            List<Participant> list = null;
            _participantService
                .Setup(x => x.GetParticipantsByUsernameAsync(It.IsAny<string>()))
                .ReturnsAsync(list);

            var result = await _controller.GetCurrentParticipant();

            Assert.NotNull(result);
            Assert.IsAssignableFrom<NotFoundResult>(result);
        }

        [Test]
        public async Task Should_return_ok_if_participant_is_found()
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
            Assert.AreEqual(participants[0].Id, response.Id);
        }

        [Test]
        public async Task Should_return_not_found_if_no_test_score_is_not_found()
        {
            var participantId = Guid.NewGuid();
            _pollyRetryService
                .Setup(x => x.WaitAndRetryAsync<NotFoundException, TestCallResult>
                (
                    It.IsAny<int>(), It.IsAny<Func<int, TimeSpan>>(), null, It.IsAny<Func<Task<TestCallResult>>>())
                )
                .ThrowsAsync(new NotFoundException("any"));

            var result = await _controller.GetTestCallResultForParticipant(participantId);

            Assert.NotNull(result);
            Assert.IsAssignableFrom<NotFoundObjectResult>(result);
            var objectResult = (ObjectResult)result;
            objectResult.Value.Should().Be($"No test score result found for participant Id: {participantId}");
        }

        [Test]
        public async Task Should_return_not_found_on_any_other_exception()
        {
            var participantId = Guid.NewGuid();
            _pollyRetryService
                .Setup(x => x.WaitAndRetryAsync<NotFoundException, TestCallResult>
                (
                    It.IsAny<int>(), It.IsAny<Func<int, TimeSpan>>(), null, It.IsAny<Func<Task<TestCallResult>>>())
                )
                .ThrowsAsync(new Exception("any"));

            var result = await _controller.GetTestCallResultForParticipant(participantId);

            Assert.NotNull(result);
            Assert.IsAssignableFrom<NotFoundObjectResult>(result);
            var objectResult = (ObjectResult)result;
            objectResult.Value.Should().Be($"No test score result found for participant Id: {participantId}");
        }

        [Test]
        public async Task Should_return_ok_if_no_test_score_is_found()
        {
            var expectedResult = new TestCallResult(true, TestScore.Good);

            _pollyRetryService
                .Setup(x => x.WaitAndRetryAsync<NotFoundException, TestCallResult>
                (
                    It.IsAny<int>(), It.IsAny<Func<int, TimeSpan>>(), null, It.IsAny<Func<Task<TestCallResult>>>())
                )
                .ReturnsAsync(expectedResult);

            var result = await _controller.GetTestCallResultForParticipant(Guid.NewGuid());

            Assert.NotNull(result);
            Assert.IsAssignableFrom<OkObjectResult>(result);
            result.Should().BeAssignableTo<OkObjectResult>().Subject.Value.Should().Be(expectedResult);
            _pollyRetryService
                .Verify(x => x.WaitAndRetryAsync<NotFoundException, TestCallResult>
                (
                    It.IsAny<int>(), It.IsAny<Func<int, TimeSpan>>(), null, It.IsAny<Func<Task<TestCallResult>>>()), Times.Once);
        }
    }
}