﻿using FizzWare.NBuilder;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using ServiceWebsite.BookingsAPI.Client;
using ServiceWebsite.Controllers;
using ServiceWebsite.UserAPI.Client;
using ServiceWebsite.VideoAPI.Client;
using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using ProblemDetails = ServiceWebsite.VideoAPI.Client.ProblemDetails;

namespace ServiceWebsite.UnitTests.Controllers
{
    public class HealthTests
    {
        private HealthCheckController _controller;
        private Mock<IUserApiClient> _userApiClientMock;
        private Mock<IBookingsApiClient> _bookingsApiClientMock;
        private Mock<IVideoApiClient> _videoApiClientMock;

        [SetUp]
        public void Setup()
        {
            _userApiClientMock = new Mock<IUserApiClient>();
            _bookingsApiClientMock = new Mock<IBookingsApiClient>();
            _videoApiClientMock = new Mock<IVideoApiClient>();

            _controller = new HealthCheckController(_userApiClientMock.Object, _bookingsApiClientMock.Object, _videoApiClientMock.Object);

            var judges = Builder<UserResponse>.CreateListOfSize(3).Build().ToList();
            _userApiClientMock.Setup(x => x.GetJudgesAsync())
                .ReturnsAsync(judges);
        }

        [Test]
        public async Task Should_return_internal_server_error_result_when_user_api_not_reachable()
        {
            var exception = new AggregateException("kinly api error");

            _userApiClientMock
                .Setup(x => x.GetJudgesAsync())
                .ThrowsAsync(exception);

            var result = await _controller.Health();
            var typedResult = (ObjectResult)result;
            typedResult.StatusCode.Should().Be((int)HttpStatusCode.InternalServerError);
            var response = (Models.HealthCheckResponse)typedResult.Value;
            response.UserApiHealth.Successful.Should().BeFalse();
            response.UserApiHealth.ErrorMessage.Should().NotBeNullOrWhiteSpace();
        }

        [Test]
        public async Task Should_return_internal_server_error_result_when_bookings_api_not_reachable()
        {
            var exception = new AggregateException("kinly api error");

            _bookingsApiClientMock
                .Setup(x => x.GetCaseTypesAsync())
                .ThrowsAsync(exception);

            var result = await _controller.Health();
            var typedResult = (ObjectResult)result;
            typedResult.StatusCode.Should().Be((int)HttpStatusCode.InternalServerError);
            var response = (Models.HealthCheckResponse)typedResult.Value;
            response.BookingsApiHealth.Successful.Should().BeFalse();
            response.BookingsApiHealth.ErrorMessage.Should().NotBeNullOrWhiteSpace();
        }

        [Test]
        public async Task Should_return_internal_server_error_result_when_non_video_api_exception_thrown()
        {
            var exception = new UriFormatException("Test format is invalid");

            _bookingsApiClientMock
                .Setup(x => x.GetCaseTypesAsync())
                .ThrowsAsync(exception);

            var result = await _controller.Health();
            var typedResult = (ObjectResult)result;
            typedResult.StatusCode.Should().Be((int)HttpStatusCode.InternalServerError);
            var response = (Models.HealthCheckResponse)typedResult.Value;
            response.BookingsApiHealth.Successful.Should().BeFalse();
            response.BookingsApiHealth.ErrorMessage.Should().NotBeNullOrWhiteSpace();
        }

        [Test]
        public async Task Should_return_internal_server_error_result_when_video_api_not_reachable()
        {
            var exception = new VideoApiServiceException<ProblemDetails>("Bad token", (int)HttpStatusCode.InternalServerError,
                "Please provide a valid conference Id", null, default, null);

            _videoApiClientMock
                .Setup(x => x.GetConferencesTodayForAdminAsync())
                .ThrowsAsync(exception);

            var result = await _controller.Health();
            var typedResult = (ObjectResult)result;
            typedResult.StatusCode.Should().Be((int)HttpStatusCode.InternalServerError);
            var response = (Models.HealthCheckResponse)typedResult.Value;
            response.VideoApiHealth.Successful.Should().BeFalse();
            response.VideoApiHealth.ErrorMessage.Should().NotBeNullOrWhiteSpace();
        }

        [Test]
        public async Task Should_return_forbidden_error_result_when_video_api_not_reachable()
        {
            var exception = new VideoApiServiceException<ProblemDetails>("Unauthorised Token", (int)HttpStatusCode.Unauthorized,
                "Invalid Client ID", null, default, null);

            _videoApiClientMock
                .Setup(x => x.GetConferencesTodayForAdminAsync())
                .ThrowsAsync(exception);

            var result = await _controller.Health();
            var typedResult = (ObjectResult)result;
            typedResult.StatusCode.Should().Be((int)HttpStatusCode.OK);
            var response = (Models.HealthCheckResponse)typedResult.Value;
            response.VideoApiHealth.Successful.Should().BeTrue();
            response.VideoApiHealth.ErrorMessage.Should().BeNullOrWhiteSpace();
        }

        [Test]
        public async Task Should_return_ok_when_all_services_are_running()
        {
            var result = await _controller.Health();
            var typedResult = (ObjectResult)result;
            typedResult.StatusCode.Should().Be((int)HttpStatusCode.OK);

            var response = (Models.HealthCheckResponse)typedResult.Value;
            response.BookingsApiHealth.Successful.Should().BeTrue();
            response.UserApiHealth.Successful.Should().BeTrue();
            response.VideoApiHealth.Successful.Should().BeTrue();
        }

        [Test]
        public async Task Should_return_the_application_version_from_assembly()
        {
            var result = await _controller.Health();
            var typedResult = (ObjectResult)result;
            var response = (Models.HealthCheckResponse)typedResult.Value;
            response.AppVersion.FileVersion.Should().NotBeNullOrEmpty();
            response.AppVersion.InformationVersion.Should().NotBeNullOrEmpty();
        }
    }
}
