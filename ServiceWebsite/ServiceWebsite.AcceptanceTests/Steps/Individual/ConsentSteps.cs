using System.Collections.Generic;
using AcceptanceTests.Common.Data.Questions;
using AcceptanceTests.Common.Driver.Browser;
using AcceptanceTests.Common.Driver.Helpers;
using AcceptanceTests.Common.PageObject.Helpers;
using AcceptanceTests.Common.Test.Steps;
using ServiceWebsite.AcceptanceTests.Data;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Pages.Individual;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps.Individual
{
    [Binding]
    public class ConsentSteps : ISteps
    {
        private readonly Dictionary<string, UserBrowser> _browsers;
        private readonly TestContext _c;

        public ConsentSteps(Dictionary<string, UserBrowser> browsers, TestContext testContext)
        {
            _browsers = browsers;
            _c = testContext;
        }

        [When(@"the user answers yes to the consent question")]
        public void ProgressToNextPage()
        {
            _browsers[_c.CurrentUser.Key].Driver.WaitForPageToLoad();
            _browsers[_c.CurrentUser.Key].ClickRadioButton(CommonLocators.RadioButtonWithLabel(_c.ServiceWebConfig.TestConfig.TestData.Consent.Answer));
            _browsers[_c.CurrentUser.Key].Click(CommonLocators.ButtonWithInnerText("Save and continue"));
            _c.Test.Answers.Add(new SuitabilityAnswer{ Answer = _c.ServiceWebConfig.TestConfig.TestData.Consent.Answer, ExtendedAnswer = null, QuestionKey = IndividualQuestionKeys.ConsentQuestion });
        }

        [When(@"the user enters more details into the please provide more details of why you do not consent textfield")]
        public void WhenTheUserEntersMoreDetailsIntoThePleaseProvideMoreDetailsOfWhyYouDoNotConsentTextfield()
        {
            _browsers[_c.CurrentUser.Key].Driver.WaitForPageToLoad();
            _browsers[_c.CurrentUser.Key].ClickRadioButton(CommonLocators.RadioButtonWithLabel("No"));
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(ConsentPage.MoreDetails).SendKeys(_c.ServiceWebConfig.TestConfig.TestData.Consent.ExtendedAnswer);
            _browsers[_c.CurrentUser.Key].Click(CommonLocators.ButtonWithInnerText("Save and continue"));
            _c.Test.Answers.Add(new SuitabilityAnswer { Answer = "No", ExtendedAnswer = _c.ServiceWebConfig.TestConfig.TestData.Consent.ExtendedAnswer, QuestionKey = IndividualQuestionKeys.ConsentQuestion });
        }
    }
}
