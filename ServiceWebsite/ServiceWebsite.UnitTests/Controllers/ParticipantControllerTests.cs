using System;
using System.Threading.Tasks;
using FluentAssertions;
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
    public class ParticipantControllerTests
    {
        private const string Username = "some.user@hearings.reform.hmcts.net";
        private readonly Guid _hearingId = Guid.NewGuid();
        private ParticipantController _controller;

        [SetUp]
        public void Setup()
        {
            _controller = new ParticipantController();
            _controller.MockUserIdentity(Username);
        }

        [Test]
        public async Task should_return_not_found_if_no_hearing_for_user_is_found()
        {
            var result = await _controller.UpdateSuitabilityAnswers(_hearingId, new System.Collections.Generic.List<HearingSuitabilityAnswer>());
            var noContentResult = (NoContentResult)result;
            Assert.AreEqual(204, noContentResult.StatusCode);
        }

    }
}