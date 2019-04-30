using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using ServiceWebsite.Controllers;
using ServiceWebsite.Domain;
using ServiceWebsite.Models;
using ServiceWebsite.Services;

namespace ServiceWebsite.UnitTests.Controllers
{
    public class HearingSuitabilityControllerTests
    {
        private HearingSuitabilityController _controller;
        private Mock<IHearingSuitabilityService> _service;

        [SetUp]
        public void Setup()
        {
            _service = new Mock<IHearingSuitabilityService>();
            _controller = new HearingSuitabilityController(_service.Object);
            _controller.MockUserIdentity("some.user@hearings.reform.hmcts.net");
        }

        [Test]
        public async Task should_map_responses_from_service()
        {
            var answer = new SuitabilityAnswer { QuestionKey = "Key", Answer = "Answer", ExtendedAnswer = "Extended" };
            var hearingSuitability = new HearingSuitability(Guid.NewGuid(), DateTime.Now.AddDays(2), new [] { answer });
            GivenServiceReturns(hearingSuitability);

            var result = await _controller.GetUserSuitabilityAnswers();
            var list = (List<HearingSuitabilityResponse>) ((OkObjectResult) result).Value;
            
            var suitabilityResponse = list.Single();
            suitabilityResponse.HearingId.Should().Be(hearingSuitability.HearingId);
            suitabilityResponse.HearingScheduledAt.Should().Be(hearingSuitability.HearingScheduledAt);

            var answerResponse = suitabilityResponse.Answers.Single();
            answerResponse.Answer.Should().Be(answer.Answer);
            answerResponse.ExtendedAnswer.Should().Be(answer.ExtendedAnswer);
            answerResponse.QuestionKey.Should().Be(answer.QuestionKey);
        }

        private void GivenServiceReturns(HearingSuitability hearingSuitability)
        {
            _service.Setup(x => x.GetHearingsSuitability(It.IsAny<string>()))
                .ReturnsAsync(new List<HearingSuitability> {hearingSuitability});
        }
    }
}