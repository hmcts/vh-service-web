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
            var axeResult = new AxeBuilder(_browserContext.NgDriver).DisableRules( //BUG: Once VIH-5174 bug is fixed, remove these exclusions
                     "duplicate-id-active", //https://dequeuniversity.com/rules/axe/3.3/duplicate-id-active?application=axeAPI
                     "landmark-no-duplicate-banner",  // https://dequeuniversity.com/rules/axe/3.3/landmark-no-duplicate-banner?application=axeAPI
                     "landmark-one-main", // https://dequeuniversity.com/rules/axe/3.3/landmark-one-main?application=axeAPI
                     "landmark-no-duplicate-contentinfo") // https://dequeuniversity.com/rules/axe/3.3/landmark-no-duplicate-contentinfo?application=axeAP
                     .Analyze(); 

            axeResult.Violations.Should().BeEmpty();
        }
    }
}
