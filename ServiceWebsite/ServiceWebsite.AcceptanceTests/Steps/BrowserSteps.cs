using System;
using OpenQA.Selenium;
using ServiceWebsite.AcceptanceTests.Helpers;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public class BrowserSteps
    {
        private readonly BrowserContext _browserContext;

        public BrowserSteps(BrowserContext browserContext)
        {
            _browserContext = browserContext;
        }

        [When(@"the user refreshes the page")]
        public void WhenTheUserRefreshesThePage()
        {
            _browserContext.NgDriver.Navigate().Refresh();
            WaitUntilPageIsLoaded();
        }

        private void WaitUntilPageIsLoaded()
        {
            // All pages have a router outlet so when we can find  this element, then the route is loaded
            try
            {
                _browserContext.Retry(() => { _browserContext.NgDriver.FindElement(By.TagName("router-outlet")); });
            }
            catch (Exception e)
            {
                var url = _browserContext.NgDriver.Url;
                throw new  TimeoutException($"Timed out waiting for page to load, the expected <router-outlet> element did not appear on current url '{url}'", e);
            }
        }
    }
}
