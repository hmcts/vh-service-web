using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using RestSharp;
using ServiceWebsite.AcceptanceTests.Contexts;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Validations;
using ServiceWebsite.Configuration;
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
            var vhServiceConfig = Options.Create(_configRoot.GetSection("VhServices").Get<ServiceSettings>()).Value;
            var token = ConfigurationHelper.GetBearerToken(_configRoot).Result;
            var restClient = new RestClient(vhServiceConfig.BookingsApiUrl);

            _bookingsApiHelper.CreateClient(restClient, token);
            TestContext = ConfigurationHelper.ParseConfigurationIntoTestContext(_configRoot, testContext).Result;
            TestLogger.Log(MethodBase.GetCurrentMethod().Name, "Setting TestContext.BaseUrl to: " + TestContext.BaseUrl);
        }

        [BeforeScenario(Order = 2)]
        public static void ResetTestData(TestContext testContext)
        {
            _dataSetUpValidation
                .AllVideoHearingBookingsShouldHaveBeenSuccessfullyDeleted(_bookingsApiHelper,
                                                                            testContext.TestUserSecrets);
        }

        [BeforeScenario(Order = 3)]
        public void CreateNewVideoHearing(TestContext testContext)
        {
            _dataSetUpValidation
                .AllVideoHearingBookingsShouldHaveBeenSuccessfullyCreated(_bookingsApiHelper,
                                                                          testContext.TestUserSecrets);

        }

        [AfterScenario(Order = 0)]
        public static void TearDown(TestContext testContext)
        {
            _dataSetUpValidation
                .AllVideoHearingBookingsShouldHaveBeenSuccessfullyDeleted(_bookingsApiHelper,
                                                                          testContext.TestUserSecrets);
        }
    }
}
