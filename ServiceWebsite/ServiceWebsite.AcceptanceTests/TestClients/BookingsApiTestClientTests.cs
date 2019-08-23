using FluentAssertions;
using Microsoft.Extensions.Configuration;
using NUnit.Framework;
using ServiceWebsite.AcceptanceTests.Configuration;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Validations;

namespace ServiceWebsite.AcceptanceTests.TestClients
{
    public class BookingsApiTestClientTests
    {
        private IConfigurationRoot _configRoot;
        private BookingsApiTestClient _client;
        private DataSetUpValidation _dataSetUpValidation;
        private BookingsApiClientHelper _helper;
        private UserAccount _userAccountConfig;
        private UserAccount _userAccountTest;

        [SetUp]
        public void SetUp()
        {
            _configRoot = ConfigurationHelper.BuildDefaultConfigRoot();
            _helper = new BookingsApiClientHelper();
            _client = _helper.CreateClientWithConfig(_configRoot);
            _dataSetUpValidation = new DataSetUpValidation();
            _userAccountConfig = ConfigurationHelper.GetUserAccountForTests(_configRoot, false);
            bool deleted = _helper.DeleteVideoHearingBookingsForAllCaseParticipants(_userAccountConfig, _client);
            deleted.Should().BeTrue("all video hearings for participants in the config should have been deleted");
        }

        [TearDown]
        public void TearDown()
        {
            _dataSetUpValidation.AllVideoHearingBookingsShouldHaveBeenSuccessfullyDeleted(_helper, _userAccountConfig, _client);
            _dataSetUpValidation.AllVideoHearingBookingsShouldHaveBeenSuccessfullyDeleted(_helper, _userAccountTest, _client);
        }

        [Test]
        public void BookingsClientIsNotNull()
        {
            _client.GetBaseUrl().Should().NotBeNull();
        }

        [Test]
        public void GetVideoHearingsBookingsForIndividualReturnsEmptyList()
        {
            var videoHearingsList = _helper.GetVideoHearingBookingsForAllParticipants(_userAccountConfig, _client);
            videoHearingsList.Should().HaveCount(0);
        }

        [Test]
        public void GetVideoHearingsBookingsForIndividualReturnsPopulatedList()
        {
            _dataSetUpValidation.AllVideoHearingBookingsShouldHaveBeenSuccessfullyCreated(_helper, _userAccountConfig, _configRoot, _client);
            var videoHearingsList = _helper.GetVideoHearingBookingsByIndividualUsernameAsListWithConfig(_configRoot, _client);
            videoHearingsList.Should().HaveCountGreaterOrEqualTo(0);
        }

        [Test]
        public void GetVideoHearingsBookingsForRepresentativeReturnsEmptyList()
        {
            var videoHearingsList = _helper.GetVideoHearingBookingsByRepresentativeUsernameAsListWithConfig(_configRoot, _client);
            videoHearingsList.Should().HaveCount(0);
        }

        [Test]
        public void GetVideoHearingsBookingsForRepresentativeReturnsPopulatedList()
        {
            _dataSetUpValidation.AllVideoHearingBookingsShouldHaveBeenSuccessfullyCreated(_helper, _userAccountConfig, _configRoot, _client);
            var videoHearingsList = _helper.GetVideoHearingBookingsByRepresentativeUsernameAsListWithConfig(_configRoot, _client);
            videoHearingsList.Should().HaveCountGreaterOrEqualTo(0);
        }

        [Test]
        public void CreateNewVideoHearingsBookingWithDefaultConfigAndRequestBodyReturnsCreated()
        {
            _dataSetUpValidation.AllVideoHearingBookingsShouldHaveBeenSuccessfullyCreated(_helper, _userAccountConfig, _configRoot, _client);
        }

        [Test]
        public void GetVideoHearingForIndividualUsernameReturnsEmptyList()
        {
            var userVideoHearingsList = _helper.GetVideoHearingBookingsByIndividualUsernameAsListWithConfig(_configRoot, _client);
            userVideoHearingsList.Should().HaveCount(0);
        }

        [Test]
        public void GetVideoHearingForRepresentativeUsernameReturnsEmptyList()
        {
            var userVideoHearingsList = _helper.GetVideoHearingBookingsByRepresentativeUsernameAsListWithConfig(_configRoot, _client);
            userVideoHearingsList.Should().HaveCount(0);
        }

        [Test]
        public void GetVideoHearingForIndividualUsernameReturnsPopulatedList()
        {
            _dataSetUpValidation.AllVideoHearingBookingsShouldHaveBeenSuccessfullyCreated(_helper, _userAccountConfig, _configRoot, _client);
            var userVideoHearingsList = _client.GetVideoHearingBookingsByUsernameAsList(_userAccountConfig.Individual);
            userVideoHearingsList.Should().HaveCountGreaterThan(0);
        }

        [Test]
        public void GetVideoHearingForRepresentativeUsernameReturnsPopulatedList()
        {
            _dataSetUpValidation.AllVideoHearingBookingsShouldHaveBeenSuccessfullyCreated(_helper, _userAccountConfig, _configRoot, _client);
            var userVideoHearingsList = _client.GetVideoHearingBookingsByUsernameAsList(_userAccountConfig.Representative);
            userVideoHearingsList.Should().HaveCountGreaterThan(0);
        }

        [Test]
        public void DeleteVideoVideoHearingForAllParticipantsSuccess()
        {
            _dataSetUpValidation.AllVideoHearingBookingsShouldHaveBeenSuccessfullyCreated(_helper, _userAccountConfig, _configRoot, _client);
            _helper.DeleteVideoHearingBookingsForAllCaseParticipants(_userAccountConfig, _client);
            _helper.GetVideoHearingBookingsForAllParticipants(_userAccountConfig, _client).Should().HaveCount(0);
        }

        [Test]
        public void OtherVideoHearingBookingsAreNotDeletedWhenCaseParticipantsInTheConfigAreDeleted()
        {
            _userAccountTest = ConfigurationHelper.GetUserAccountForTests(_configRoot, true);
            _dataSetUpValidation.AllVideoHearingBookingsShouldHaveBeenSuccessfullyCreated(_helper, _userAccountTest, _configRoot, _client);

            _dataSetUpValidation.AllVideoHearingBookingsShouldHaveBeenSuccessfullyCreated(_helper, _userAccountConfig, _configRoot, _client);

            _helper.DeleteVideoHearingBookingsForAllCaseParticipants(_userAccountConfig, _client);

            _helper.GetVideoHearingBookingsForAllParticipants(_userAccountConfig, _client).Should().HaveCount(0);
            _helper.GetVideoHearingBookingsForAllParticipants(_userAccountTest, _client).Should().HaveCountGreaterThan(1);
        }
    }
}
