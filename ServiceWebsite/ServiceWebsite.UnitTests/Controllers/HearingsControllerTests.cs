using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using ServiceWebsite.Common;
using ServiceWebsite.Controllers;
using ServiceWebsite.Domain;
using ServiceWebsite.Models;
using ServiceWebsite.Services;

namespace ServiceWebsite.UnitTests.Controllers
{
    public class HearingsControllerTests
    {
        private const string Username = "some.user@hmcts.net";
        private readonly Guid _hearingId = Guid.NewGuid();
        private readonly DateTime _scheduledDateTime = new DateTime(2019, 2, 4, 12, 30, 0);
        private Mock<IHearingsService> _service;
        private HearingsController _controller;

        [SetUp]
        public void Setup()
        {
            _service = new Mock<IHearingsService>();
            _controller = new HearingsController(_service.Object);
            _controller.MockUserIdentity(Username);
        }

        [Test]
        public async Task Should_return_not_found_if_no_hearing_for_user_is_found()
        {
            // given service returns
            _service.Setup(x => x.GetHearingFor(Username, _hearingId))
                .ThrowsAsync(new NotFoundException("message"));

            var result = (NotFoundObjectResult) await _controller.GetHearing(_hearingId);
            Assert.AreEqual($"No hearing with id '{_hearingId}' found for user", result.Value);
        }

        [Test]
        public async Task Should_return_unauthorized_for_hearing_the_user_is_not_participant_in()
        {
            // given service throws
            _service.Setup(x => x.GetHearingFor(Username, _hearingId))
                .ThrowsAsync(new UnauthorizedAccessException("msg"));

            var result = (UnauthorizedObjectResult) await _controller.GetHearing(_hearingId);
            Assert.AreEqual(result.Value, $"User is not a participant of hearing with id '{_hearingId}'");
        }

        [Test]
        public async Task Should_return_hearing_for_user()
        {
            var hearing = new Hearing(_hearingId, "case name", "case number", _scheduledDateTime, "caseType",
                "hearingType");
            _service.Setup(x => x.GetHearingFor(Username, _hearingId))
                .ReturnsAsync(hearing);

            var result = (OkObjectResult) await _controller.GetHearing(_hearingId);
            var hearingResponse = (HearingDetailsResponse) result.Value;
            Assert.AreEqual(hearing.CaseName, hearingResponse.CaseName);
            Assert.AreEqual(hearing.CaseNumber, hearingResponse.CaseNumber);
            Assert.AreEqual(hearing.HearingType, hearingResponse.HearingType);
            Assert.AreEqual(hearing.CaseType, hearingResponse.CaseType);
            Assert.AreEqual(hearing.ScheduledDateTime, hearingResponse.ScheduledDateTime);
        }
    }
}