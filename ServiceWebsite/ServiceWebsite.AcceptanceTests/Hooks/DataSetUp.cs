using Microsoft.Extensions.Configuration;
using ServiceWebsite.AcceptanceTests.Contexts;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.TestClients;
using ServiceWebsite.AcceptanceTests.Validations;
using System.Reflection;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Hooks
{
    [Binding]
    public class DataSetUp
    {
        private static BookingsApiClientHelper _bookingsApiHelper;
        private static DataSetUpValidation _dataSetUpValidation;
        private static IConfigurationRoot _configRoot;
        private static BookingsApiTestClient _client;
        public TestContext TestContext { get; set; }

        public DataSetUp()
        {
            _bookingsApiHelper = new BookingsApiClientHelper();
            _dataSetUpValidation = new DataSetUpValidation();
        }

        [BeforeScenario(Order = 0)]
        public void OneTimeSetup(TestContext testContext)
        {
            _configRoot = ConfigurationHelper.BuildDefaultConfigRoot();
            _client = _bookingsApiHelper.CreateClientWithConfig(_configRoot);
            TestContext = ConfigurationHelper.ParseConfigurationIntoTestContext(_configRoot, testContext);
            TestLogger.Log(MethodBase.GetCurrentMethod().Name, "Test Context: " + TestContext);
        }

        [BeforeScenario(Order = 2)]
        public static void ResetTestData(TestContext testContext)
        {
            _dataSetUpValidation
                .AllVideoHearingBookingsShouldHaveBeenSuccessfullyDeleted(_bookingsApiHelper,
                                                                            testContext.TestUserSecrets,
                                                                            _client);
        }

        [BeforeScenario(Order = 3)]
        public void CreateNewVideoHearing(TestContext testContext)
        {
            _dataSetUpValidation
                .AllVideoHearingBookingsShouldHaveBeenSuccessfullyCreated(_bookingsApiHelper,
                                                                          testContext.TestUserSecrets,
                                                                           _configRoot,
                                                                           _client);

        }

        [AfterScenario(Order = 0)]
        public static void TearDown(TestContext testContext)
        {
            _dataSetUpValidation
                .AllVideoHearingBookingsShouldHaveBeenSuccessfullyDeleted(_bookingsApiHelper,
                                                                          testContext.TestUserSecrets,
                                                                          _client);
        }
    }
}
