using Moq;
using NUnit.Framework;
using ServiceWebsite.BookingsAPI.Client;
using ServiceWebsite.Domain;
using ServiceWebsite.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServiceWebsite.UnitTests.Services
{
    public class ParticipantServiceTests
    {
        private ParticipantService _participantService;


        private Mock<IBookingsApiClient> _bookingsApiClient;


        private readonly Guid _hearingId;
        private readonly Guid _participantId;

        private readonly List<SuitabilityAnswer> _answers;
        private readonly List<SuitabilityAnswersRequest> _answerRequests;

        public ParticipantServiceTests()
        {
            _hearingId = Guid.NewGuid();
            _participantId = Guid.NewGuid();

            _answers = new List<SuitabilityAnswer>{ new SuitabilityAnswer()
            {
                QuestionKey = "TEST_QUESTION",
                Answer = "Answer",
                ExtendedAnswer = "Extended answer"
            } };

            _answerRequests = new List<SuitabilityAnswersRequest> { new SuitabilityAnswersRequest()
            {
                Key = "TEST_QUESTION",
                Answer = "Answer",
                Extended_answer = "Extended answer"
            }};

        }

        [SetUp]
        public void Setup()
        {
            _bookingsApiClient = new Mock<IBookingsApiClient>();
            _participantService = new ParticipantService(_bookingsApiClient.Object);
        }

        [Test]
        public void Should_throw_notfound_exception_when_hearing_not_found()
        {

            var serverErrorException = new BookingsApiException("msg", 500, "resp", null, null);
            _bookingsApiClient.Setup(x => x.UpdateSuitabilityAnswersAsync(_hearingId, _participantId, new List<SuitabilityAnswersRequest>())).ThrowsAsync(serverErrorException);

            // the exception is rethrown
            Assert.ThrowsAsync<BookingsApiException>(async () => await _participantService.UpdateSuitabilityAnswers(_hearingId, _participantId, new List<SuitabilityAnswer>()));
        }

        [Test]
        public async Task Should_update_suitability_answersAsync()
        {
            _bookingsApiClient.Setup(x => x.UpdateSuitabilityAnswersAsync(_hearingId, _participantId, _answerRequests)).Callback(() => { }).Returns(Task.CompletedTask);
            await _participantService.UpdateSuitabilityAnswers(_hearingId, _participantId, _answers);
            _bookingsApiClient.Verify(x => x.UpdateSuitabilityAnswersAsync(_hearingId, _participantId, It.IsAny<IEnumerable<SuitabilityAnswersRequest>>()),
                Times.Once);

        }

        [Test]
        public void Should_re_throw_exception_when_booking_client_error()
        {

            var serverErrorException = new BookingsApiException("msg", 500, "resp", null, null);
            _bookingsApiClient.Setup(x => x.GetParticipantsByUsernameAsync("someuser")).ThrowsAsync(serverErrorException);

            // the exception is rethrown
            Assert.ThrowsAsync<BookingsApiException>(async () => await _participantService.GetParticipantsByUsernameAsync("someuser"));
        }

        [Test]
        public async Task Should_throw_notfound_exception_when_participant_not_found()
        {

            var serverErrorException = new BookingsApiException("msg", 404, "resp", null, null);
            const string username = "someuser";
            _bookingsApiClient.Setup(x => x.GetParticipantsByUsernameAsync(username)).ThrowsAsync(serverErrorException);

            var result = await _participantService.GetParticipantsByUsernameAsync(username);

            Assert.AreEqual(Enumerable.Empty<Participant>(), result);
        }

        [Test]
        public async Task should_return_participants()
        {
            var participantResponses = new List<ParticipantResponse>
            {
                new ParticipantResponse{ Id = Guid.NewGuid(), Username = "one" },
                new ParticipantResponse{ Id = Guid.NewGuid(), Username = "two" },
                new ParticipantResponse{ Id = Guid.NewGuid(), Username = "three" },
            };

            const string username = "someuser";

            _bookingsApiClient
                .Setup(x => x.GetParticipantsByUsernameAsync(username))
                .ReturnsAsync(participantResponses);

            var result = (await _participantService.GetParticipantsByUsernameAsync(username)).ToList();

            Assert.NotNull(result);
            CollectionAssert.AllItemsAreInstancesOfType(result, typeof(Participant));
            Assert.AreEqual(participantResponses.Count, result.Count);
            Assert.AreEqual("one", result[0].Username);
            Assert.AreEqual("two", result[1].Username);
            Assert.AreEqual("three", result[2].Username);
        }
    }
}