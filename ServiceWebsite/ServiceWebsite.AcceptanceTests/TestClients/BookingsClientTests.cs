using System;
using System.Collections.Generic;
using System.Net;
using System.Reflection;
using FluentAssertions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using NUnit.Framework;
using ServiceWebsite.AcceptanceTests.Configuration;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Models;
using ServiceWebsite.BookingsAPI.Client;
using ServiceWebsite.Configuration;

namespace ServiceWebsite.AcceptanceTests
{
    public class BookingsClientTests
    {
        static string INDIVIDUAL_TEST_ACCOUNT = "video-hearing-booking-creation-individual@hmctest.com";
        static string REPRESENTATIVE_TEST_ACCOUNT = "video-hearing-booking-creation-representative@hmctest.com";
        IConfigurationRoot __configRoot;
        BookingsClient __client;
        UserAccount __userAccountConfig;
        UserAccount __userAccountTest;

        [SetUp]
        public void SetUp()
        {
            __configRoot = ConfigurationHelper.BuildDefaultConfigRoot();
            __client = CreateClientWithConfig(__configRoot);
            __userAccountConfig = GetUserAccountForTests(false, __configRoot);
            bool deleted = DeleteVideoHearingBookingsForAllCaseParticipants(__userAccountConfig, __client);
            deleted.Should().BeTrue("All video hearings for participants in the case details in default config " +
                                        "should have been successfully deleted");
        }

        [TearDown]
        public void TearDown()
        {
            VideoHearingBookingsShouldHaveBeenSuccessfullyDeleted(__userAccountConfig, __client);
            VideoHearingBookingsShouldHaveBeenSuccessfullyDeleted(__userAccountTest, __client);
        }

        [Test]
        public void BookingsClientIsNotNull()
        {
            __client.BaseUrl.Should().NotBe(null);
        }

        [Test]
        public void GetVideoHearingsBookingsForIndividualReturnsEmptyList()
        {
            var videoHearingsList = GetVideoHearingBookingsForAllParticipants(__userAccountConfig, __client);
            videoHearingsList.Should().HaveCount(0);
        }

        [Test]
        public void GetVideoHearingsBookingsForIndividualReturnsPopulatedList()
        {
            VideoHearingBookingsShouldHaveBeenSuccessfullyCreated(__userAccountConfig, __configRoot, __client);
            var videoHearingsList = GetVideoHearingBookingsByIndividualUsernameAsListWithConfig(__configRoot, __client);
            videoHearingsList.Should().HaveCountGreaterOrEqualTo(0);
        }

        [Test]
        public void GetVideoHearingsBookingsForRepresentativeReturnsEmptyList()
        {
            var videoHearingsList = GetVideoHearingBookingsByRepresentativeUsernameAsListWithConfig(__configRoot, __client);
            videoHearingsList.Should().HaveCount(0);
        }

        [Test]
        public void GetVideoHearingsBookingsForRepresentativeReturnsPopulatedList()
        {
            VideoHearingBookingsShouldHaveBeenSuccessfullyCreated(__userAccountConfig, __configRoot, __client);
            var videoHearingsList = GetVideoHearingBookingsByRepresentativeUsernameAsListWithConfig(__configRoot, __client);
            videoHearingsList.Should().HaveCountGreaterOrEqualTo(0);
        }

        [Test]
        public void CreateNewVideoHearingsBookingWithDefaultConfigAndRequestBodyReturnsCreated()
        {
            VideoHearingBookingsShouldHaveBeenSuccessfullyCreated(__userAccountConfig, __configRoot, __client);
        }

        [Test]
        public void GetVideoHearingForIndividualUsernameReturnsEmptyList()
        {
            var userVideoHearingsList = GetVideoHearingBookingsByIndividualUsernameAsListWithConfig(__configRoot, __client);
            userVideoHearingsList.Should().HaveCount(0);
        }

        [Test]
        public void GetVideoHearingForRepresentativeUsernameReturnsEmptyList()
        {
            var userVideoHearingsList = GetVideoHearingBookingsByRepresentativeUsernameAsListWithConfig(__configRoot, __client);
            userVideoHearingsList.Should().HaveCount(0);
        }

        [Test]
        public void GetVideoHearingForIndividualUsernameReturnsPopulatedList()
        {
            VideoHearingBookingsShouldHaveBeenSuccessfullyCreated(__userAccountConfig, __configRoot, __client);
            var userVideoHearingsList = __client.GetVideoHearingBookingsByUsernameAsList(__userAccountConfig.Individual);
            userVideoHearingsList.Should().HaveCountGreaterThan(0);
        }

        [Test]
        public void GetVideoHearingForRepresentativeUsernameReturnsPopulatedList()
        {
            VideoHearingBookingsShouldHaveBeenSuccessfullyCreated(__userAccountConfig, __configRoot, __client);
            var userVideoHearingsList = __client.GetVideoHearingBookingsByUsernameAsList(__userAccountConfig.Representative);
            userVideoHearingsList.Should().HaveCountGreaterThan(0);
        }

        [Test]
        public void DeleteVideoVideoHearingForAllParticipantsSuccess()
        {
            VideoHearingBookingsShouldHaveBeenSuccessfullyCreated(__userAccountConfig, __configRoot, __client);
            DeleteVideoHearingBookingsForAllCaseParticipants(__userAccountConfig, __client);
            GetVideoHearingBookingsForAllParticipants(__userAccountConfig, __client).Should().HaveCount(0);
        }

        [Test]
        public void OtherVideoHearingBookingsAreNotDeletedWhenCaseParticipantsInTheConfigAreDeleted()
        {
            __userAccountTest = GetUserAccountForTests(true, __configRoot);
            VideoHearingBookingsShouldHaveBeenSuccessfullyCreated(__userAccountTest, __configRoot, __client);

            VideoHearingBookingsShouldHaveBeenSuccessfullyCreated(__userAccountConfig, __configRoot, __client);            

            DeleteVideoHearingBookingsForAllCaseParticipants(__userAccountConfig, __client);

            GetVideoHearingBookingsForAllParticipants(__userAccountConfig, __client).Should().HaveCount(0);
            GetVideoHearingBookingsForAllParticipants(__userAccountTest, __client).Should().HaveCountGreaterThan(1);
        }


        #region Assertions
        private void VideoHearingBookingsShouldHaveBeenSuccessfullyCreated(UserAccount userAccount, IConfigurationRoot configRoot, BookingsClient client)
        {
            bool created = CreateNewVideoHearingForCaseParticipants(userAccount, configRoot, client);
            created.Should().BeTrue("New Video Hearings for case participants in config " +
                                        "should have been successfully created");
        }

        private void VideoHearingBookingsShouldHaveBeenSuccessfullyDeleted(UserAccount userAccount, BookingsClient client)
        {
            if (userAccount != null)
            {
                bool deleted = DeleteVideoHearingBookingsForAllCaseParticipants(userAccount, client);
                deleted.Should().BeTrue("All video hearings for participants in the case details in default config " +
                                            "should have been successfully deleted");
            } else
            {
                TestLogger.Log(Assembly.GetCallingAssembly().GetName().FullName, "There are no video hearing bookings to be deleted");
            }
        }
        #endregion

        #region Test Helper

        private BookingsClient CreateClientWithConfig(IConfigurationRoot configRoot)
        {
            var vhServiceConfig = Options.Create(configRoot.GetSection("VhServices").Get<ServiceSettings>()).Value;
            var token = ConfigurationHelper.GetBearerToken(configRoot);
            return new BookingsClient(vhServiceConfig.BookingsApiUrl, token);
        }

        private UserAccount GetUserAccountForTests(bool useAccountExternalUsername, IConfigurationRoot configRoot)
        {
            UserAccount userAccount = new UserAccount();

            if (!useAccountExternalUsername)
            {
                userAccount = Options.Create(configRoot.GetSection("TestUserSecrets").Get<UserAccount>()).Value;
            }
            else
            {
                userAccount.Individual = INDIVIDUAL_TEST_ACCOUNT;
                userAccount.Representative = REPRESENTATIVE_TEST_ACCOUNT;
            }

            return userAccount;
        }

        private bool CreateNewVideoHearingForCaseParticipants(UserAccount userAccount, IConfigurationRoot configRoot, BookingsClient client)
        {
            var requestBody = CreateHearingRequest.BuildRequest(userAccount.Individual, userAccount.Representative);
            var statusCode = client.CreateNewVideoHearingsBooking(requestBody);
            return statusCode.Equals(HttpStatusCode.Created);
        }

        private List<HearingDetailsResponse> GetVideoHearingBookingsByIndividualUsernameAsListWithConfig(IConfigurationRoot configRoot, BookingsClient client)
        {
            var userAccount = Options.Create(configRoot.GetSection("TestUserSecrets").Get<UserAccount>()).Value;
            return client.GetVideoHearingBookingsByUsernameAsList(userAccount.Individual);
        }

        private List<HearingDetailsResponse> GetVideoHearingBookingsByRepresentativeUsernameAsListWithConfig(IConfigurationRoot configRoot, BookingsClient client)
        {
            var userAccount = Options.Create(configRoot.GetSection("TestUserSecrets").Get<UserAccount>()).Value;
            return client.GetVideoHearingBookingsByUsernameAsList(userAccount.Representative);
        }

        public List<HearingDetailsResponse> GetVideoHearingBookingsForAllParticipants(UserAccount userAccount, BookingsClient client)
        {
            List<HearingDetailsResponse> videoHearings = client.GetVideoHearingBookingsByUsernameAsList(userAccount.Individual);
            if (videoHearings != null)
            {
                videoHearings.AddRange((IEnumerable<HearingDetailsResponse>)client.GetVideoHearingBookingsByUsernameAsList(userAccount.Representative));
            }
            else
            {
                videoHearings = client.GetVideoHearingBookingsByUsernameAsList(userAccount.Representative);
            }

            return videoHearings;
        }

        public bool DeleteVideoHearingBookingsForAllCaseParticipants(UserAccount userAccount, BookingsClient client)
        {
            bool success = true;
            List<HearingDetailsResponse> videoHearings = GetVideoHearingBookingsForAllParticipants(userAccount, client);

            try
            {
                if (videoHearings != null)
                {
                    foreach (var videoHearingBooking in videoHearings)
                    {
                        __client.DeleteVideoHearingBookingForId(videoHearingBooking.Id.ToString());
                    }
                }
            } catch (Exception ex)
            {
                success = false;
                TestLogger.Log(Assembly.GetCallingAssembly().GetName().FullName, "Exception deleting all video hearings: " + ex.Message);
            }

            return success;
        }
        #endregion
    }
}
