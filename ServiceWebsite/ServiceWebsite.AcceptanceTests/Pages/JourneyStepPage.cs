using OpenQA.Selenium;
using ServiceWebsite.AcceptanceTests.Helpers;

namespace ServiceWebsite.AcceptanceTests.Pages
{
    public class JourneyStepPage : Page
    {
        public JourneyStepPage(BrowserContext browserContext, string pageUrl) : base(browserContext, pageUrl)
        {
           
        }

        public virtual void Continue()
        {
            Validate();
            BrowserContext.NgDriver.WaitUntilElementVisible(By.Id("continue")).Click();
        }
    }
}