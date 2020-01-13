using System.Collections.Generic;
using AcceptanceTests.Common.Driver.Browser;
using AcceptanceTests.Common.Driver.Helpers;
using AcceptanceTests.Common.PageObject.Helpers;
using AcceptanceTests.Common.Test.Steps;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Pages.IndividualPages;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps.Individual
{
    [Binding]
    public class AboutYouSteps : ISteps
    {
        private readonly Dictionary<string, UserBrowser> _browsers;
        private readonly TestContext _c;
        private readonly AboutYouPage _aboutYouPage;

        public AboutYouSteps(Dictionary<string, UserBrowser> browsers, TestContext testContext, AboutYouPage aboutYouPage)
        {
            _browsers = browsers;
            _c = testContext;
            _aboutYouPage = aboutYouPage;
        }

        public void ProgressToNextPage()
        {
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilElementExists(CommonLocators.RadioButtonWithLabel("No")).Click();
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(CommonLocators.ButtonWithInnerText("Continue")).Click();
        }

        [When(@"the user enters more details into the please provide more details textfield")]
        public void WhenTheUserEntersMoreDetailsIntoThePleaseProvideMoreDetailsTextfield()
        {
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(_aboutYouPage.MoreDetailsTextfield)
                .SendKeys(_c.ServiceWebConfig.TestConfig.TestData.AboutYou);
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(CommonLocators.ButtonWithInnerText("Continue")).Click();
        }
    }
}
