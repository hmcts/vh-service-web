using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using ServiceWebsite.Common;
using ServiceWebsite.Controllers;
using ServiceWebsite.Domain;
using ServiceWebsite.Services;

namespace ServiceWebsite.UnitTests.Controllers
{
    public class HearingsControllerTests
    {
        private const string Username = "some.user@hearings.reform.hmcts.net";
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
        public async Task should_return_not_found_if_no_hearing_for_user_is_found()
        {
            // given service returns
            _service.Setup(x => x.GetHearingFor(Username, "missing id"))
                .ThrowsAsync(new NotFoundException("message"));

            var result = (NotFoundObjectResult) await _controller.GetHearing("missing id");
            Assert.AreEqual("No hearing with id 'missing id' found for user", result.Value);
        }

        [Test]
        public async Task should_return_hearing_for_user()
        {
            var hearing = new Hearing(1234, "case name", "case number");
            _service.Setup(x => x.GetHearingFor(Username, "id"))
                .ReturnsAsync(hearing);

            var result = (OkObjectResult) await _controller.GetHearing("id");
            Assert.AreEqual(hearing, result.Value);
        }
    }
}