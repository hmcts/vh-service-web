﻿using System.Collections.Generic;
using AcceptanceTests.Common.Data.Questions;
using AcceptanceTests.Common.Driver.Drivers;
using AcceptanceTests.Common.PageObject.Helpers;
using AcceptanceTests.Common.Test.Steps;
using ServiceWebsite.AcceptanceTests.Data;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.Services.TestApi;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps.Individual
{
    [Binding]
    public class YourInternetConnectionSteps : ISteps
    {
        private readonly Dictionary<User, UserBrowser> _browsers;
        private readonly TestContext _c;

        public YourInternetConnectionSteps(Dictionary<User, UserBrowser> browsers, TestContext testContext)
        {
            _browsers = browsers;
            _c = testContext;
        }

        public void ProgressToNextPage()
        {
            _browsers[_c.CurrentUser].ClickRadioButton(CommonLocators.RadioButtonWithLabel(_c.WebConfig.TestConfig.TestData.InternetConnection));
            _browsers[_c.CurrentUser].Click(CommonLocators.ButtonWithInnerText("Continue"));
            _c.Test.Answers.Add(new SuitabilityAnswer{ Answer = _c.WebConfig.TestConfig.TestData.InternetConnection, ExtendedAnswer = null, QuestionKey = IndividualQuestionKeys.InternetQuestion });
        }

        [When(@"the user answers no to the your internet connection question")]
        public void WhenTheUserAnswersNoToTheYourInternetConnectionQuestion()
        {
            _browsers[_c.CurrentUser].ClickRadioButton(CommonLocators.RadioButtonWithLabel("No"));
            _browsers[_c.CurrentUser].Click(CommonLocators.ButtonWithInnerText("Continue"));
            _c.Test.Answers.Add(new SuitabilityAnswer { Answer = "No", ExtendedAnswer = null, QuestionKey = IndividualQuestionKeys.InternetQuestion });
        }
    }
}
