using OpenQA.Selenium;
using System.Collections.Generic;

namespace ServiceWebsite.AcceptanceTests.Helpers
{
    public class GetMethods
    {
        public static string GetText(By element, BrowserContext context) =>
             context.NgDriver.WaitUntilElementVisible(element).Text.Trim();

        public static bool IsElementDisplayed(By element, BrowserContext context) =>
             context.NgDriver.WaitUntilElementVisible(element).Displayed;

        public static string GetAttributeValue(By element, BrowserContext context, string attribute) =>
            context.NgDriver.WaitUntilElementVisible(element).GetAttribute(attribute);

        public static IEnumerable<IWebElement> GetElements(By element, BrowserContext context) =>
             context.NgDriver.WaitUntilElementsVisible(element);
    }
}