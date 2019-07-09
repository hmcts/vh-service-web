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
        }
    }
}
