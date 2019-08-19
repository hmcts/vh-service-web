using System;
using FluentAssertions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using NUnit.Framework;
using ServiceWebsite.AcceptanceTests.Configuration;
using ServiceWebsite.AcceptanceTests.Hooks;
using ServiceWebsite.Configuration;

namespace ServiceWebsite.AcceptanceTests
{
    public class BookingsClientTests
    {
        IConfigurationRoot __configRoot;
        BookingsClient __client;

        [SetUp]
        public void SetUp()
        {
            DataSetUp dataSetUp = new DataSetUp();
            __configRoot = dataSetUp.BuildConfigRoot();
            __client = CreateClientWithDefaultConfig();
        }

        [Test]
        public void BookingsClientIsNotNull()
        {
            __client.BaseUrl.Should().NotBe(null);
        }

        [Test]
        public void GetVideoHearingsBookingsForIndividualReturnsEmptyList()
        {
            var userAccountConfig = Options.Create(__configRoot.GetSection("TestUserSecrets").Get<UserAccount>()).Value;
            var videoHearings = __client.GetVideoHearingsActiveBookings(userAccountConfig.Individual);
            videoHearings.Should().NotBe(null);
        }

        [Test]
        public void CreateNewVideoHearingsBookingWithDefaultRequestBodyReturnsSuccess()
        {
            var userAccountConfig = Options.Create(__configRoot.GetSection("TestUserSecrets").Get<UserAccount>()).Value;
            var videoHearings = __client.CreateNewVideoHearingsBooking(userAccountConfig);
            videoHearings.Should().NotBe(null);
        }

        #region Test Helper

        private BookingsClient CreateClientWithDefaultConfig()
        {
            var vhServiceConfig = Options.Create(__configRoot.GetSection("VhServices").Get<ServiceSettings>()).Value;
            return new BookingsClient(vhServiceConfig.BookingsApiUrl);
        }

        #endregion
    }
}
