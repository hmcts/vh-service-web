using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using NUnit.Framework;
using RestSharp;
using ServiceWebsite.AcceptanceTests.Configuration;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Validations;
using ServiceWebsite.Configuration;

namespace ServiceWebsite.AcceptanceTests.TestClients
{
    public class BookingsApiTestClientTests
    {
        private IConfigurationRoot _configRoot;
        private DataSetUpValidation _dataSetUpValidation;
        private BookingsApiClientHelper _helper;
        private UserAccount _userAccountConfig;
        private UserAccount _userAccountTest;

        [SetUp]
        public void SetUp()
        {
            _dataSetUpValidation = new DataSetUpValidation();
            _helper = new BookingsApiClientHelper();
            _configRoot = ConfigurationHelper.BuildDefaultConfigRoot();
            var vhServiceConfig = Options.Create(_configRoot.GetSection("VhServices").Get<ServiceSettings>()).Value;
            var token = ConfigurationHelper.GetBearerToken(_configRoot).Result;
            var restClient = new RestClient(vhServiceConfig.BookingsApiUrl);
            _userAccountConfig = ConfigurationHelper.GetUserAccountForTests(_configRoot, false);

            _helper.CreateClient(restClient, token);

            //TODO: VIH-4945 Clear Person, address and organisation name tables
            _dataSetUpValidation.AllVideoHearingBookingsShouldHaveBeenSuccessfullyDeleted(_helper, _userAccountConfig);
        }

        [TearDown]
        public void TearDown()
        {
            _dataSetUpValidation.AllVideoHearingBookingsShouldHaveBeenSuccessfullyDeleted(_helper, _userAccountConfig);
            _dataSetUpValidation.AllVideoHearingBookingsShouldHaveBeenSuccessfullyDeleted(_helper, _userAccountTest);
        }

        [Test]
        public void BookingsClientIsNotNull()
        {
            _helper.Client.GetBaseUrl().Should().NotBeNull();
        }

        [Test]
        public void GetVideoHearingsBookingsForIndividualReturnsEmptyList()
        {
            var videoHearingsList = _helper.GetVideoHearingBookingsForAllParticipants(_userAccountConfig);
            videoHearingsList.Should().HaveCount(0);
        }

        [Test]
        public void GetVideoHearingsBookingsForIndividualReturnsPopulatedList()
        {
            _dataSetUpValidation.AllVideoHearingBookingsShouldHaveBeenSuccessfullyCreated(_helper, _userAccountConfig);
            var videoHearingsList = _helper.GetVideoHearingBookingsByIndividualUsernameAsListWithConfig(_configRoot);
            videoHearingsList.Should().HaveCountGreaterOrEqualTo(0);
        }

        [Test]
        public void GetVideoHearingsBookingsForRepresentativeReturnsEmptyList()
        {
            var videoHearingsList = _helper.GetVideoHearingBookingsByRepresentativeUsernameAsListWithConfig(_configRoot);
            videoHearingsList.Should().HaveCount(0);
        }

        [Test]
        public void GetVideoHearingsBookingsForRepresentativeReturnsPopulatedList()
        {
            _dataSetUpValidation.AllVideoHearingBookingsShouldHaveBeenSuccessfullyCreated(_helper, _userAccountConfig);
            var videoHearingsList = _helper.GetVideoHearingBookingsByRepresentativeUsernameAsListWithConfig(_configRoot);
            videoHearingsList.Should().HaveCountGreaterOrEqualTo(0);
        }

        [Test]
        public void CreateNewVideoHearingsBookingWithDefaultConfigAndRequestBodyReturnsCreated()
        {
            _dataSetUpValidation.AllVideoHearingBookingsShouldHaveBeenSuccessfullyCreated(_helper, _userAccountConfig);
        }

        [Test]
        public void GetVideoHearingForIndividualUsernameReturnsEmptyList()
        {
            var userVideoHearingsList = _helper.GetVideoHearingBookingsByIndividualUsernameAsListWithConfig(_configRoot);
            userVideoHearingsList.Should().HaveCount(0);
        }

        [Test]
        public void GetVideoHearingForRepresentativeUsernameReturnsEmptyList()
        {
            var userVideoHearingsList = _helper.GetVideoHearingBookingsByRepresentativeUsernameAsListWithConfig(_configRoot);
            userVideoHearingsList.Should().HaveCount(0);
        }

        [Test]
        public void GetVideoHearingForIndividualUsernameReturnsPopulatedList()
        {
            _dataSetUpValidation.AllVideoHearingBookingsShouldHaveBeenSuccessfullyCreated(_helper, _userAccountConfig);
            var userVideoHearingsList = _helper.Client.GetVideoHearingBookingsByUsernameAsList(_userAccountConfig.Individual);
            userVideoHearingsList.Should().HaveCountGreaterThan(0);
        }

        [Test]
        public void GetVideoHearingForRepresentativeUsernameReturnsPopulatedList()
        {
            _dataSetUpValidation.AllVideoHearingBookingsShouldHaveBeenSuccessfullyCreated(_helper, _userAccountConfig);
            var userVideoHearingsList = _helper.Client.GetVideoHearingBookingsByUsernameAsList(_userAccountConfig.Representative);
            userVideoHearingsList.Should().HaveCountGreaterThan(0);
        }

        [Test]
        public void DeleteVideoVideoHearingForAllParticipantsSuccess()
        {
            _dataSetUpValidation.AllVideoHearingBookingsShouldHaveBeenSuccessfullyCreated(_helper, _userAccountConfig);
            _helper.DeleteVideoHearingBookingsForAllCaseParticipants(_userAccountConfig);
            _helper.GetVideoHearingBookingsForAllParticipants(_userAccountConfig).Should().HaveCount(0);
        }

        [Test]
        public void OtherVideoHearingBookingsAreNotDeletedWhenCaseParticipantsInTheConfigAreDeleted()
        {
            _userAccountTest = ConfigurationHelper.GetUserAccountForTests(_configRoot, true);
            _dataSetUpValidation.AllVideoHearingBookingsShouldHaveBeenSuccessfullyCreated(_helper, _userAccountTest);

            _dataSetUpValidation.AllVideoHearingBookingsShouldHaveBeenSuccessfullyCreated(_helper, _userAccountConfig);

            _helper.DeleteVideoHearingBookingsForAllCaseParticipants(_userAccountConfig);

            _helper.GetVideoHearingBookingsForAllParticipants(_userAccountConfig).Should().HaveCount(0);
            _helper.GetVideoHearingBookingsForAllParticipants(_userAccountTest).Should().HaveCountGreaterThan(1);
        }
    }
}
