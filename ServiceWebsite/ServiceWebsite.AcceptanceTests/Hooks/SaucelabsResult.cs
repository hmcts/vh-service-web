using System;
using OpenQA.Selenium;

namespace ServiceWebsite.AcceptanceTests.Hooks
{
    public class SaucelabsResult
    {
        public static void LogPassed(bool passed, IWebDriver driver)
        {
            try
            {
                ((IJavaScriptExecutor)driver).ExecuteScript("sauce:job-result=" + (passed ? "passed" : "failed"));
            }
            catch (Exception e)
            {
                Console.WriteLine($"<{e.GetType().Name}> Failed to report test status to saucelabs: {e.Message}");
            }
        }
    }
}