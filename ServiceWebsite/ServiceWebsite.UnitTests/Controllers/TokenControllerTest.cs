using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using ServiceWebsite.Controllers;
using ServiceWebsite.Models;
using System;
using ServiceWebsite.Common.Security;

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
            var participantId = "B4E1C447-0E97-4BFD-B1D8-006DD28D8428";
            var expiresOn = DateTime.UtcNow.AddMinutes(20).ToUniversalTime().ToString("dd.MM.yyyy-H:mmZ");

            _service.Setup(x => x.GenerateHash(expiresOn, participantId)).Returns("token string");

            var result = (OkObjectResult)_controller.GetToken(Guid.Parse(participantId));
            Assert.IsInstanceOf(typeof(TokenResponse), result.Value);
        }
    }
}