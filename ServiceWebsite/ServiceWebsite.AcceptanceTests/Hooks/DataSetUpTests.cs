using System;
using System.Reflection;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using FluentAssertions;
using Microsoft.Extensions.Configuration;
using NUnit.Framework;
using ServiceWebsite.AcceptanceTests.Helpers;

namespace ServiceWebsite.AcceptanceTests.Hooks
{
    public class DataSetUpTests
    {
        private DataSetUp __dataSetUp;
		private static string FULL_TEST_NAME = Assembly.GetCallingAssembly().GetName().FullName;

		[SetUp]
        public void SetUp()
        {
            __dataSetUp = new DataSetUp();
        }

        [Test]
        public void BuildConfigRootBuildsConfigReturnsConfigNotNull() => ConfigurationHelper.BuildDefaultConfigRoot().Should().NotBe(null);

        [TestCaseSource("ListExpectedConfig")]
        public void BuildConfigRootBuildsCorrectConfigItemAndItsNotEmpty(string expectedConfigItem)
        {
            TestLogger.Log(FULL_TEST_NAME, "Given I have set the " + expectedConfigItem + "configuration item");

            TestLogger.Log(FULL_TEST_NAME, "When the test configuration is loaded");
            IEnumerable<KeyValuePair<string, string>> configEnumarable = GetActualConfigAsEnumerable();

            TestLogger.Log(FULL_TEST_NAME, "Then the config I set originally is correctly built with it's respective value");
            KeyValuePair<string, string> actualConfigItem = FindExpectedConfigItemInActualConfig(expectedConfigItem, configEnumarable);

            TestLogger.Log(FULL_TEST_NAME, "And its value is not empty");
            actualConfigItem.Value.Should().NotBe(null);
        }

        #region TestHelper
        //TODO: Move to a helper package
        private IEnumerable<KeyValuePair<string, string>> GetActualConfigAsEnumerable()
        {
            var configRoot = ConfigurationHelper.BuildDefaultConfigRoot();
            return configRoot.AsEnumerable();
        }

        private static KeyValuePair<string, string> FindExpectedConfigItemInActualConfig(string expectedConfigItem, IEnumerable<KeyValuePair<string, string>> configEnumarable)
        {
            KeyValuePair<string, string> actualConfigItem = new KeyValuePair<string, string>();
            foreach (var configItem in configEnumarable)
            {
                if (configItem.Key.StartsWith(expectedConfigItem, StringComparison.Ordinal))
                {
                    actualConfigItem = configItem;
                    break;
                }
            }

            return actualConfigItem;
        }
        #endregion

        #region TestData
        //TODO: Move to a helper package
        public static IEnumerable<TestCaseData> ListExpectedConfig()
        {
            string filePath = Path.GetDirectoryName(System.AppContext.BaseDirectory) +
                                            "/Resources/DataHook_ExpectedCofiguration.txt";
            TestLogger.Log(FULL_TEST_NAME, "Expected configuration file path: " + filePath);

            List<string> expectedConfigList = System.IO.File.ReadLines(filePath).ToList();

            foreach (var expectedConfigItem in expectedConfigList)
            {
                Console.WriteLine(FULL_TEST_NAME, "Expected configItem: " + expectedConfigItem);
                yield return new TestCaseData(expectedConfigItem);
            }
        }
        #endregion
    }
}