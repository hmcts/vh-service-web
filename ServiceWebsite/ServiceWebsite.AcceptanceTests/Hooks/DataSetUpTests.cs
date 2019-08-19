using System;
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
        private DataSetUp _dataSetUp;

        [SetUp]
        public void SetUp()
        {
            _dataSetUp = new DataSetUp();
        }

        [Test]
        public void BuildConfigRootBuildsConfigReturnsConfigNotNull() => _dataSetUp.BuildConfigRoot().Should().NotBe(null);

        [TestCaseSource("ListExpectedConfig")]
        public void BuildConfigRootBuildsCorrectConfigItemAndItsNotEmpty(string expectedConfigItem)
        {
            TestLogger.Log("Given I have set the " + expectedConfigItem + "configuration item");

            TestLogger.Log("When the test configuration is loaded");
            IEnumerable<KeyValuePair<string, string>> configEnumarable = GetActualConfigAsEnumerable();

            TestLogger.Log("Then the config I set originally is correctly built with it's respective value");
            KeyValuePair<string, string> actualConfigItem = FindExpectedConfigItemInActualConfig(expectedConfigItem, configEnumarable);

            TestLogger.Log("And its value is not empty");
            actualConfigItem.Value.Should().NotBe(null);
        }

        #region TestHelper
        //TODO: Move to a helper package
        private IEnumerable<KeyValuePair<string, string>> GetActualConfigAsEnumerable()
        {
            var configRoot = _dataSetUp.BuildConfigRoot();
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
            TestLogger.Log("Expected configuration file path: " + filePath);

            List<string> expectedConfigList = System.IO.File.ReadLines(filePath).ToList();

            foreach (var expectedConfigItem in expectedConfigList)
            {
                Console.WriteLine("Expected configItem: " + expectedConfigItem);
                yield return new TestCaseData(expectedConfigItem);
            }
        }
        #endregion
    }
}