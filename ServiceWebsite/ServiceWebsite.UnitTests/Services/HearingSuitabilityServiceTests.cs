using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using Moq;
using NUnit.Framework;
using ServiceWebsite.BookingsAPI.Client;
using ServiceWebsite.Domain;
using ServiceWebsite.Services;

namespace ServiceWebsite.UnitTests.Services
{
    public class HearingSuitabilityServiceTests
    {
        private const string Username = "some.username@hearings.reform.hmcts.net";
        
        private HearingSuitabilityService _service;
        
        private Mock<IBookingsApiClient> _bookingsApiClient;

        private readonly List<PersonSuitabilityAnswerResponse> _hearingsList;
        
        private readonly PersonSuitabilityAnswerResponse _upcomingHearing;
        private readonly Guid _pastHearingId;
        private readonly DateTime _upcomingHearingScheduledAt;
        private readonly Guid _submittedHearingId = Guid.NewGuid();
        private readonly SuitabilityAnswerResponse _answeredQuestion;

        public HearingSuitabilityServiceTests()
        {
            _upcomingHearingScheduledAt = DateTime.Now.AddDays(2);
            _upcomingHearing = new PersonSuitabilityAnswerResponse
            {
                Hearing_id = Guid.NewGuid(),
                Scheduled_at = _upcomingHearingScheduledAt,
                Answers = new List<SuitabilityAnswerResponse>()
            };

            _pastHearingId = Guid.NewGuid();
            var pastHearing = new PersonSuitabilityAnswerResponse
            {
                Hearing_id = _pastHearingId,
                Scheduled_at = DateTime.UtcNow.AddDays(-2),
                Answers = new List<SuitabilityAnswerResponse>()
            };

            _answeredQuestion = new SuitabilityAnswerResponse
            {
                Key = "QUESTION",
                Answer = "Answer",
                Extended_answer = "Extended answer"
            };
            var submittedHearing = new PersonSuitabilityAnswerResponse
            {
                Hearing_id = _submittedHearingId,
                Scheduled_at = DateTime.UtcNow.AddDays(3),
                Answers = new List<SuitabilityAnswerResponse> {_answeredQuestion}
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
        public async Task should_return_hearing_suitability_for_user()
        {
            GivenTheBookingsApiReturnsListOfHearingsWithAnswers();

            var upcomingHearings = await _service.GetHearingsSuitability(Username);
            
            // then list includes upcoming hearing
            var upcomingHearing = upcomingHearings.Single(h => h.HearingId == _upcomingHearing.Hearing_id);
            upcomingHearing.HearingScheduledAt.Should().Be(_upcomingHearingScheduledAt);
        }

        [Test]
        public async Task should_return_answered_questions_for_upcoming_hearings()
        {
            GivenTheBookingsApiReturnsListOfHearingsWithAnswers();

            var upcomingHearings = await _service.GetHearingsSuitability(Username);
            
            // then existing answers are return
            var submittedHearing = upcomingHearings.Single(h => h.HearingId == _submittedHearingId);
            var submittedAnswer = submittedHearing.Answers.First();
            submittedAnswer.Answer.Should().Be(_answeredQuestion.Answer);
            submittedAnswer.QuestionKey.Should().Be(_answeredQuestion.Key);
            submittedAnswer.ExtendedAnswer.Should().Be(_answeredQuestion.Extended_answer);
        }
        
        [Test]
        public async Task should_return_past_hearing_suitability_answers()
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