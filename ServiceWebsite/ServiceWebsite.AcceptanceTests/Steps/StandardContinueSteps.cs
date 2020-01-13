using System.Collections.Generic;
using AcceptanceTests.Common.Driver.Browser;
using AcceptanceTests.Common.PageObject.Pages;
using AcceptanceTests.Common.Test.Steps;
using ServiceWebsite.AcceptanceTests.Helpers;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public class StandardContinueSteps : ISteps
    {
        private readonly Dictionary<string, UserBrowser> _browsers;
        private readonly TestContext _c;
        private readonly CommonPages _commonPages;

        public StandardContinueSteps(Dictionary<string, UserBrowser> browsers, TestContext testContext, CommonPages commonPages)
        {
            _browsers = browsers;
            _c = testContext;
            _commonPages = commonPages;
        }

        public void ProgressToNextPage()
        {
            throw new System.NotImplementedException();
        }
    }
}
