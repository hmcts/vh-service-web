using System.Collections.Generic;
using AcceptanceTests.Common.Data.Questions;
using AcceptanceTests.Common.Driver.Browser;
using AcceptanceTests.Common.Driver.Helpers;
using AcceptanceTests.Common.PageObject.Helpers;
using AcceptanceTests.Common.Test.Steps;
using OpenQA.Selenium;
using ServiceWebsite.AcceptanceTests.Data;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Pages.Representative;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps.Representative
{
    [Binding]
    public class OtherInformationSteps : ISteps
    {
        private readonly Dictionary<string, UserBrowser> _browsers;
        private readonly TestContext _c;

        public OtherInformationSteps(Dictionary<string, UserBrowser> browsers, TestContext testContext)
        {
            _browsers = browsers;
            _c = testContext;
        }

        public void ProgressToNextPage()
        {
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilElementExists(CommonLocators.RadioButtonWithLabel(_c.ServiceWebConfig.TestConfig.TestData.OtherInformation.Answer)).Click();
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(OtherInformationPage.ContinueButton).Click();
            _c.Test.Answers.Add(new SuitabilityAnswer
            {
                Answer = _c.ServiceWebConfig.TestConfig.TestData.OtherInformation.Answer,
                ExtendedAnswer = null,
                QuestionKey = RepresentativeQuestionKeys.OtherInformation
            });
        }

        [When(@"the user enters more details into the please provide more information textfield")]
        public void WhenTheUserEntersMoreDetailsIntoThePleaseProvideMoreInformationTextfield()
        {
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilElementExists(CommonLocators.RadioButtonWithLabel("Yes")).Click();
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(OtherInformationPage.OtherInformationTextField).SendKeys(_c.ServiceWebConfig.TestConfig.TestData.OtherInformation.ExtendedAnswer);
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(OtherInformationPage.OtherInformationTextField).SendKeys(Keys.Tab);
            _c.Test.Answers.Add(new SuitabilityAnswer
            {
                Answer = "Yes",
                ExtendedAnswer = _c.ServiceWebConfig.TestConfig.TestData.OtherInformation.ExtendedAnswer,
                QuestionKey = RepresentativeQuestionKeys.OtherInformation
            });
        }
    }
}
