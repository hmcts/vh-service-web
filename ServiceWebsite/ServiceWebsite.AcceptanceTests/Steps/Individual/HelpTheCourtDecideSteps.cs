using System.Collections.Generic;
using AcceptanceTests.Common.Driver.Drivers;
using AcceptanceTests.Common.PageObject.Helpers;
using AcceptanceTests.Common.Test.Steps;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.Services.TestApi;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps.Individual
{
    [Binding]
    public class HelpTheCourtDecideSteps : ISteps
    {
        private readonly Dictionary<User, UserBrowser> _browsers;
        private readonly TestContext _c;

        public HelpTheCourtDecideSteps(Dictionary<User, UserBrowser> browsers, TestContext testContext)
        {
            _browsers = browsers;
            _c = testContext;
        }

        public void ProgressToNextPage()
        {
            _browsers[_c.CurrentUser].Click(CommonLocators.ButtonWithInnerText("Continue to questions"));
        }
    }
}
