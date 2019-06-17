using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Moq;
using NUnit.Framework;
using ServiceWebsite.BookingsAPI.Client;
using ServiceWebsite.Common;
using ServiceWebsite.Domain;
using ServiceWebsite.Services;

namespace ServiceWebsite.UnitTests.Services
{
    public class ParticipantServiceTests
    {
        private const string Username = "some.username@hearings.reform.hmcts.net";
        
        private ParticipantService _participantService;
 
        
        private Mock<IBookingsApiClient> _bookingsApiClient;

       
        private readonly Guid _hearingId;
        private readonly Guid _participantId;
        
        private readonly List<SuitabilityAnswer> _answers;

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


        }

        [SetUp]
        public void Setup()
        {
            _bookingsApiClient = new Mock<IBookingsApiClient>();
            _participantService = new ParticipantService(_bookingsApiClient.Object);
        }

        [Test]
        public async Task should_throw_notfound_exception_when_hearing_not_found()
        {
               
            var serverErrorException = new BookingsApiException("msg", 500, "resp", null, null);
            _bookingsApiClient.Setup(x => x.UpdateSuitabilityAnswersAsync(_hearingId, _participantId, new List<SuitabilityAnswersRequest>())).ThrowsAsync(serverErrorException);

            // the exception is rethrown
            Assert.ThrowsAsync<BookingsApiException>(() => _participantService.UpdateSuitabilityAnswers(_hearingId, _participantId, new List<SuitabilityAnswer>()));
            
            
        }
    }
}