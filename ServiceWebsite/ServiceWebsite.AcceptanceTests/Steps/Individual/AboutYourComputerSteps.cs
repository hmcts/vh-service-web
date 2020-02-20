using System.Collections.Generic;
using AcceptanceTests.Common.Data.Questions;
using AcceptanceTests.Common.Driver.Browser;
using AcceptanceTests.Common.Driver.Helpers;
using AcceptanceTests.Common.PageObject.Helpers;
using AcceptanceTests.Common.Test.Steps;
using ServiceWebsite.AcceptanceTests.Data;
using ServiceWebsite.AcceptanceTests.Helpers;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps.Individual
{
    [Binding]
    public class AboutYourComputerSteps : ISteps
    {
        private readonly Dictionary<string, UserBrowser> _browsers;
        private readonly TestContext _c;

        public AboutYourComputerSteps(Dictionary<string, UserBrowser> browsers, TestContext testContext)
        {
            _browsers = browsers;
            _c = testContext;
        }

        public void ProgressToNextPage()
        {
            _browsers[_c.CurrentUser.Key].ClickRadioButton(CommonLocators.RadioButtonWithLabel(_c.ServiceWebConfig.TestConfig.TestData.AboutYourComputer));
            _browsers[_c.CurrentUser.Key].Click(CommonLocators.ButtonWithInnerText("Continue"));
            _c.Test.Answers.Add(new SuitabilityAnswer{ Answer = _c.ServiceWebConfig.TestConfig.TestData.AboutYourComputer, ExtendedAnswer = null, QuestionKey = IndividualQuestionKeys.CameraMicrophoneQuestion });
        }

        [When(@"the user answers no to the about your computer question")]
        public void WhenTheUserAnswersNoToTheAboutYourComputerQuestion()
        {
            _browsers[_c.CurrentUser.Key].ClickRadioButton(CommonLocators.RadioButtonWithLabel("No"));
            _browsers[_c.CurrentUser.Key].Click(CommonLocators.ButtonWithInnerText("Continue"));
            _c.Test.Answers.Add(new SuitabilityAnswer { Answer = "No", ExtendedAnswer = null, QuestionKey = IndividualQuestionKeys.CameraMicrophoneQuestion });
        }
    }
}
