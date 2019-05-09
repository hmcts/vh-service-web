using OpenQA.Selenium;

namespace ServiceWebsite.AcceptanceTests.Helpers
{
    public class SetMethods
    {
        public static void ClickElement(By element, BrowserContext context) =>
            context.NgDriver.WaitUntilElementVisible(element).Click();
    }
}