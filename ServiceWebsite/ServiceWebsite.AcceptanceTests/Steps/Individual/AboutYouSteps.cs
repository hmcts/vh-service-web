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
    public class AboutYouSteps : ISteps
    {
        private readonly Dictionary<string, UserBrowser> _browsers;
        private readonly TestContext _c;

        public AboutYouSteps(Dictionary<string, UserBrowser> browsers, TestContext testContext)
        {
            _browsers = browsers;
            _c = testContext;
        }

        public void ProgressToNextPage()
        {
            _browsers[_c.CurrentUser.Key].ClickRadioButton(CommonLocators.RadioButtonWithLabel(_c.ServiceWebConfig.TestConfig.TestData.AboutYou.Answer));
            _browsers[_c.CurrentUser.Key].Click(CommonLocators.ButtonWithInnerText("Continue"));
            _c.Test.Answers.Add(new SuitabilityAnswer
            {
                Answer = _c.ServiceWebConfig.TestConfig.TestData.AboutYou.Answer,
                ExtendedAnswer = null,
                QuestionKey = IndividualQuestionKeys.AboutYouQuestion
            });
        }

        [When(@"the user enters more details into the please provide more details textfield")]
        public void WhenTheUserEntersMoreDetailsIntoThePleaseProvideMoreDetailsTextfield()
        {
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(AboutYouPage.MoreDetailsTextfield).SendKeys(_c.ServiceWebConfig.TestConfig.TestData.AboutYou.ExtendedAnswer);
            _browsers[_c.CurrentUser.Key].Click(CommonLocators.ButtonWithInnerText("Continue"));
            _c.Test.Answers.Add(new SuitabilityAnswer
            {
                Answer = "Yes",
                ExtendedAnswer = _c.ServiceWebConfig.TestConfig.TestData.AboutYou.ExtendedAnswer,
                QuestionKey = IndividualQuestionKeys.AboutYouQuestion
            });
        }
    }
}
