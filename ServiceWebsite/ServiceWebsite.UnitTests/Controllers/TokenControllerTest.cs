﻿using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using ServiceWebsite.Controllers;
using ServiceWebsite.Models;
using System;
using ServiceWebsite.Common.Security;
using FluentAssertions;
using System.Linq;

namespace ServiceWebsite.UnitTests.Controllers
{
    public class TokenControllerTests
    {
        private Mock<IHashGenerator> _service;
        private TokenController _controller;

        [SetUp]
        public void Setup()
        {
            _service = new Mock<IHashGenerator>();
            _controller = new TokenController(_service.Object);
        }

        [Test]
        public void Should_return_a_token_response()
        {
            var participantId = Guid.NewGuid().ToString();
            var expiresOn = DateTime.UtcNow.AddMinutes(20).ToUniversalTime().ToString("dd.MM.yyyy-H:mmZ");

            _service.Setup(x => x.GenerateSelfTestTokenHash(expiresOn, participantId)).Returns("token string");

            var result = (OkObjectResult)_controller.GetToken(Guid.Parse(participantId));
            Assert.IsInstanceOf(typeof(TokenResponse), result.Value);
            var tokenResponse = (TokenResponse)result.Value;
            tokenResponse.ExpiresOn.Length.Should().BeOneOf(16,17);
        }

        [Test]
        public void Should_return_a_bad_response_for_empty_participant_id()
        {
            var participantId = Guid.Empty;
            var result = (BadRequestObjectResult)_controller.GetToken(participantId);
            Assert.IsNotNull(result.Value);
            var error = (SerializableError)result.Value;
            error.ContainsKey("participantId").Should().BeTrue();
            ((string[])error["participantId"]).First().Should().Be("Please provide a valid participantId");
        }
    }
}