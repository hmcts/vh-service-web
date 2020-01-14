using System.Collections.Generic;
using AcceptanceTests.Common.Driver.Browser;
using AcceptanceTests.Common.Driver.Helpers;
using AcceptanceTests.Common.PageObject.Helpers;
using AcceptanceTests.Common.Test.Steps;
using ServiceWebsite.AcceptanceTests.Data;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Questions;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps.Individual
{
    [Binding]
    public class YourComputerSteps : ISteps
    {
        private readonly Dictionary<string, UserBrowser> _browsers;
        private readonly TestContext _c;

        public YourComputerSteps(Dictionary<string, UserBrowser> browsers, TestContext testContext)
        {
            _browsers = browsers;
            _c = testContext;
        }

        public void ProgressToNextPage()
        {
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilElementExists(CommonLocators.RadioButtonWithLabel(_c.ServiceWebConfig.TestConfig.TestData.YourComputer)).Click();
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(CommonLocators.ButtonWithInnerText("Continue")).Click();
            _c.Test.Answers.Add(new SuitabilityAnswer
            {
                Answer = _c.ServiceWebConfig.TestConfig.TestData.YourComputer,
                ExtendedAnswer = null,
                QuestionKey = IndividualQuestionKeys.CheckYourComputerQuestion
            });
        }
    }
}
