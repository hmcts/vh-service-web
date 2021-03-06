using FluentAssertions;
using Moq;
using NUnit.Framework;
using BookingsApi.Client;
using ServiceWebsite.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookingsApi.Contract.Responses;

namespace ServiceWebsite.UnitTests.Services
{
    public class HearingSuitabilityServiceTests
    {
        private const string Username = "some.username@hmcts.net";
        private HearingSuitabilityService _service;
        private Mock<IBookingsApiClient> _bookingsApiClient;
        private readonly List<PersonSuitabilityAnswerResponse> _hearingsList;
        private readonly PersonSuitabilityAnswerResponse _upcomingHearing;
        private readonly Guid _pastHearingId;
        private readonly DateTime _upcomingHearingScheduledAt;
        private readonly Guid _submittedHearingId = Guid.NewGuid();
        private readonly bool _questionnaireNotRequired;
        private readonly SuitabilityAnswerResponse _answeredQuestion;

        public HearingSuitabilityServiceTests()
        {
            _upcomingHearingScheduledAt = DateTime.Now.AddDays(2);
            _questionnaireNotRequired = true;
            _upcomingHearing = new PersonSuitabilityAnswerResponse
            {
                HearingId = Guid.NewGuid(),
                ParticipantId = Guid.NewGuid(),
                ScheduledAt = _upcomingHearingScheduledAt,
                QuestionnaireNotRequired = _questionnaireNotRequired,
                Answers = new List<SuitabilityAnswerResponse>()
            };

            _pastHearingId = Guid.NewGuid();
            var pastHearing = new PersonSuitabilityAnswerResponse
            {
                HearingId = _pastHearingId,
                ParticipantId = Guid.NewGuid(),
                ScheduledAt = DateTime.UtcNow.AddDays(-2),
                Answers = new List<SuitabilityAnswerResponse>()
            };

            _answeredQuestion = new SuitabilityAnswerResponse
            {
                Key = "QUESTION",
                Answer = "Answer",
                ExtendedAnswer = "Extended answer"
            };

            var submittedHearing = new PersonSuitabilityAnswerResponse
            {
                HearingId = _submittedHearingId,
                ParticipantId = Guid.NewGuid(),
                ScheduledAt = DateTime.UtcNow.AddDays(3),
                Answers = new List<SuitabilityAnswerResponse> { _answeredQuestion }
            };

            _hearingsList = new List<PersonSuitabilityAnswerResponse>
            {
                _upcomingHearing,
                pastHearing,
                submittedHearing
            };
        }

        [SetUp]
        public void Setup()
        {
            _bookingsApiClient = new Mock<IBookingsApiClient>();
            _service = new HearingSuitabilityService(_bookingsApiClient.Object);
        }

        [Test]
        public async Task Should_return_hearing_suitability_for_user()
        {
            GivenTheBookingsApiReturnsListOfHearingsWithAnswers();

            var upcomingHearings = await _service.GetHearingsSuitability(Username);

            // then list includes upcoming hearing
            var upcomingHearing = upcomingHearings.Single(h => h.HearingId == _upcomingHearing.HearingId);
            upcomingHearing.HearingScheduledAt.Should().Be(_upcomingHearingScheduledAt);
            upcomingHearing.QuestionnaireNotRequired.Should().Be(_questionnaireNotRequired);
            upcomingHearing.ParticipantId.Should().Be(_upcomingHearing.ParticipantId);
        }

        [Test]
        public async Task Should_return_answered_questions_for_upcoming_hearings()
        {
            GivenTheBookingsApiReturnsListOfHearingsWithAnswers();

            var upcomingHearings = await _service.GetHearingsSuitability(Username);

            // then existing answers are return
            var submittedHearing = upcomingHearings.Single(h => h.HearingId == _submittedHearingId);
            var submittedAnswer = submittedHearing.Answers.First();
            submittedAnswer.Answer.Should().Be(_answeredQuestion.Answer);
            submittedAnswer.QuestionKey.Should().Be(_answeredQuestion.Key);
            submittedAnswer.ExtendedAnswer.Should().Be(_answeredQuestion.ExtendedAnswer);
        }

        [Test]
        public async Task Should_return_past_hearing_suitability_answers()
        {
            GivenTheBookingsApiReturnsListOfHearingsWithAnswers();

            var upcomingHearings = await _service.GetHearingsSuitability(Username);

            // then list does not include past hearing
            var hearingIds = upcomingHearings.Select(h => h.HearingId).ToList();
            hearingIds.Should().Contain(_pastHearingId);
        }

        private void GivenTheBookingsApiReturnsListOfHearingsWithAnswers()
        {
            _bookingsApiClient.Setup(x => x.GetPersonSuitabilityAnswersAsync(Username))
                .ReturnsAsync(_hearingsList);
        }
    }
}