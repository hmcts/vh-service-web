using System;
using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using ServiceWebsite.Controllers;
using ServiceWebsite.UserAPI.Client;
using System.Security.Claims;
using System.Threading.Tasks;
using FluentAssertions;
using ServiceWebsite.Models;

namespace ServiceWebsite.UnitTests.Controllers
{
    public class ProfileControllerTest
    {
        private readonly Mock<IUserApiClient> _userApiClient;

        private readonly ProfileController _controller;

        public ProfileControllerTest()
        {
            _userApiClient = new Mock<IUserApiClient>();
            _controller = new ProfileController(_userApiClient.Object)
            {
                ControllerContext = new ControllerContext
                {
                    HttpContext = new DefaultHttpContext
                    {
                        User = new ClaimsPrincipal(new ClaimsIdentity(new[]
                        {
                            new Claim(ClaimTypes.Name, "username")
                        }))
                    }
                }
            };
        }

        [Test]
        public async Task Get_user_profile_returns_ok()
        {
            var userProfile = new UserProfile{Email = "email", User_role = "userrole"};
            _userApiClient.Setup(x => x.GetUserByAdUserNameAsync("username")).ReturnsAsync(userProfile);

            var result = await _controller.GetUserProfile();

            result.Should().NotBeNull().And.BeAssignableTo<OkObjectResult>();
            var userProfileResponse = result.As<OkObjectResult>().Value.As<UserProfileResponse>();
            userProfileResponse.Email.Should().Be(userProfile.Email);
            userProfileResponse.Role.Should().Be(userProfile.User_role);
        }

        [Test]
        public async Task Get_user_profile_returns_not_found()
        {
            var userApiException = new UserApiException("message", (int) HttpStatusCode.NotFound, "response", null, null);

            _userApiClient
                .Setup(x => x.GetUserByAdUserNameAsync("username"))
                .Throws(userApiException);

            var result = await _controller.GetUserProfile();

            result.Should().NotBeNull().And.BeAssignableTo<NotFoundResult>();
        }

        [Test]
        public async Task Get_user_profile_returns_unauthorized()
        {
            var userApiException = new UserApiException("message", (int)HttpStatusCode.Unauthorized, "response", null, null);

            _userApiClient
                .Setup(x => x.GetUserByAdUserNameAsync("username"))
                .Throws(userApiException);

            var result = await _controller.GetUserProfile();

            result.Should().NotBeNull().And.BeAssignableTo<UnauthorizedObjectResult>();
        }

        [Test]
        public async Task Get_user_profile_returns_internal_server_error()
        {
            var userApiException = new UserApiException("message", (int)HttpStatusCode.InternalServerError, "response", null, null);

            _userApiClient
                .Setup(x => x.GetUserByAdUserNameAsync("username"))
                .Throws(userApiException);

            var result = await _controller.GetUserProfile();

            result
                .Should()
                .NotBeNull().And.BeAssignableTo<ObjectResult>()
                .Subject.StatusCode.Should().Be((int) HttpStatusCode.InternalServerError);
        }

        [Test]
        public void Get_user_profile_rethrows_exception()
        {
            _userApiClient
                .Setup(x => x.GetUserByAdUserNameAsync("username"))
                .Throws(new Exception("message"));

            Assert.ThrowsAsync<Exception>(() => _controller.GetUserProfile());
        }
    }
}