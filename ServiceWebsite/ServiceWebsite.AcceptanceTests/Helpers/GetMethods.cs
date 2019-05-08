using OpenQA.Selenium;

namespace ServiceWebsite.AcceptanceTests.Helpers
{
    public class GetMethods
    {
        public static string GetText(By element, BrowserContext context) =>
             context.NgDriver.WaitUntilElementVisible(element).Text.Trim();

        public static bool IsElementDisplayed(By element, BrowserContext context) =>
             context.NgDriver.WaitUntilElementVisible(element).Displayed;
    }
}