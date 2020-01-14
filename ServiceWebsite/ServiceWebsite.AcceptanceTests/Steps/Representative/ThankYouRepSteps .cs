using System.Collections.Generic;
using AcceptanceTests.Common.Driver.Browser;
using AcceptanceTests.Common.Test.Steps;
using ServiceWebsite.AcceptanceTests.Helpers;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps.Representative
{
    [Binding]
    public class ThankYouRepSteps : ISteps
    {
        private readonly Dictionary<string, UserBrowser> _browsers;
        private readonly TestContext _c;

        public ThankYouRepSteps(Dictionary<string, UserBrowser> browsers, TestContext testContext)
        {
            _browsers = browsers;
            _c = testContext;
        }

        public void ProgressToNextPage() { }
    }
}
