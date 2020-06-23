using System.Collections.Generic;
using AcceptanceTests.Common.Driver.Drivers;
using ServiceWebsite.AcceptanceTests.Helpers;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public class SignInOnComputerSteps
    {
        private readonly Dictionary<string, UserBrowser> _browsers;
        private readonly TestContext _c;

        public SignInOnComputerSteps(Dictionary<string, UserBrowser> browsers, TestContext c)
        {
            _browsers = browsers;
            _c = c;
        }

        [Then(@"the page displays details about signing in on a computer")]
        public void ThenThePageDisplaysDetailsAboutSigningInOnAComputer()
        {
            ScenarioContext.Current.Pending();
        }
    }
}
