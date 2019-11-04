using ServiceWebsite.AcceptanceTests.Helpers;
using TechTalk.SpecFlow;
using Selenium.Axe;
using FluentAssertions;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public class AccessibilitySteps
    {
        private readonly BrowserContext _browserContext;

        public AccessibilitySteps(BrowserContext browserContext)
        {
            _browserContext = browserContext;
        }

        [Then(@"the page should be accessible")]
        public void ThenThePageShouldBeAccessible()
        {
            var axeResult = new AxeBuilder(_browserContext.NgDriver).Analyze();
            axeResult.Violations.Should().BeEmpty();
        }
    }
}
