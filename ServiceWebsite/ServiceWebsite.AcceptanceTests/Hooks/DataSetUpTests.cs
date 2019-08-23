using System;
using System.Reflection;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using FluentAssertions;
using NUnit.Framework;
using ServiceWebsite.AcceptanceTests.Helpers;
using TestContext = ServiceWebsite.AcceptanceTests.Contexts.TestContext;

namespace ServiceWebsite.AcceptanceTests.Hooks
{
    public class DataSetUpTests
    {
        private DataSetUp _dataSetUp;
		private static string FULL_TEST_NAME = Assembly.GetCallingAssembly().GetName().FullName;

		[SetUp]
        public void SetUp()
        {
            _dataSetUp = new DataSetUp();

		}

        [Test]
        public void BuildConfigRootBuildsConfigReturnsConfigNotNull() => ConfigurationHelper.BuildDefaultConfigRoot().Should().NotBeNull();

        [TestCaseSource("GetExpectedConfigItems")]
        public void BuildConfigRootBuildsCorrectConfigItemAndItsNotEmpty(string expectedConfigItem)
        {
            string methodName = MethodBase.GetCurrentMethod().Name;
            TestLogger.Log(methodName, "Given I have set the " + expectedConfigItem + "configuration item");

            TestLogger.Log(methodName, "When the test configuration is loaded");
            IEnumerable<KeyValuePair<string, string>> configEnumarable = ConfigurationHelper.GetActualConfigAsEnumerable();

            TestLogger.Log(methodName, "Then the config I set originally is correctly built with it's respective value");
            KeyValuePair<string, string> actualConfigItem = ConfigurationHelper.FindExpectedConfigItemInActualConfig(expectedConfigItem, configEnumarable);

            TestLogger.Log(methodName, "And its value is not empty");
            actualConfigItem.Value.Should().NotBeNull();
        }

		[Test]
		public void OneTimeSetupAzureAdIsNotNull()
		{
			_dataSetUp.OneTimeSetup(new TestContext());
			_dataSetUp.TestContext.AzureAd.Should().NotBeNull();
		}

		public void OneTimeSetupBearerTokenIsNotNull()
		{
			_dataSetUp.OneTimeSetup(new TestContext());
			_dataSetUp.TestContext.BearerToken.Should().NotBeNull();
		}

		public void OneTimeSetupBaseUrlIsNotNull()
		{
			_dataSetUp.OneTimeSetup(new TestContext());
			_dataSetUp.TestContext.BaseUrl.Should().NotBeNull();
		}

		public void OneTimeSetupTestUserSecretsIsNotNull()
		{
			_dataSetUp.OneTimeSetup(new TestContext());
			_dataSetUp.TestContext.TestUserSecrets.Should().NotBeNull();
			_dataSetUp.TestContext.VideoAppUrl.Should().NotBeNull();
		}

		public void OneTimeSetupVideoAppUrlIsNotNull()
		{
			_dataSetUp.OneTimeSetup(new TestContext());
			_dataSetUp.TestContext.VideoAppUrl.Should().NotBeNull();
		}

		public void OneTimeSetupWebsiteUrlIsNotNull()
		{
			_dataSetUp.OneTimeSetup(new TestContext());
			_dataSetUp.TestContext.WebsiteUrl.Should().NotBeNull();
		}

        //TODO: implement method to check teardown method is working as expected including deleting the extra records currently not being deleted
        // VIH-4945
        public void TearDownClearsAllTestDataInTheDatabase()
        {
            throw new NotImplementedException();
        }

        #region TestData
        //TODO: Move to a helper package
        public static IEnumerable<TestCaseData> GetExpectedConfigItems()
        {
            string filePath = Path.GetDirectoryName(AppContext.BaseDirectory) +
                                            "/Resources/DataHook_ExpectedCofiguration.txt";
            TestLogger.Log(MethodBase.GetCurrentMethod().ReflectedType.Name, "Expected configuration file path: " + filePath);

            List<string> expectedConfigList = File.ReadLines(filePath).ToList();

            foreach (var expectedConfigItem in expectedConfigList)
            {
                Console.WriteLine(FULL_TEST_NAME, "Expected configItem: " + expectedConfigItem);
                yield return new TestCaseData(expectedConfigItem);
            }
        }
		#endregion
	}
}