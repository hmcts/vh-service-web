using OpenQA.Selenium;

namespace ServiceWebsite.AcceptanceTests.Helpers
{
    public class SetMethods
    {
        public static void ClickElement(By element, BrowserContext context) =>
            context.NgDriver.WaitUntilElementVisible(element).Click();

        public static void InputValue(string value, By element, BrowserContext context) =>
            context.NgDriver.WaitUntilElementVisible(element).SendKeys(value);

        public static void SelectRadioButton(By element, BrowserContext context)
        {
            var webElement = context.NgDriver.FindElement(element);
            if (webElement.Enabled)            
                webElement.Click();                       
        }           
    }
}