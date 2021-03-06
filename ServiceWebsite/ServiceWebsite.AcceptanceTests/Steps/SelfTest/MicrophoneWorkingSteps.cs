﻿using System.Collections.Generic;
using AcceptanceTests.Common.Data.Questions;
using AcceptanceTests.Common.Driver.Drivers;
using AcceptanceTests.Common.PageObject.Helpers;
using AcceptanceTests.Common.Test.Steps;
using ServiceWebsite.AcceptanceTests.Data;
using ServiceWebsite.AcceptanceTests.Helpers;
using TestApi.Contract.Dtos;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps.SelfTest
{
    [Binding]
    public class MicrophoneWorkingSteps : ISteps
    {
        private readonly Dictionary<UserDto, UserBrowser> _browsers;
        private readonly TestContext _c;

        public MicrophoneWorkingSteps(Dictionary<UserDto, UserBrowser> browsers, TestContext testContext)
        {
            _browsers = browsers;
            _c = testContext;
        }

        public void ProgressToNextPage()
        {
            _browsers[_c.CurrentUser].ClickRadioButton(CommonLocators.RadioButtonWithLabel(_c.WebConfig.TestConfig.TestData.MicrophoneWorking));
            _browsers[_c.CurrentUser].Click(CommonLocators.ButtonWithInnerText("Continue"));
            _c.Test.Answers.Add(new SuitabilityAnswer
            {
                Answer = _c.WebConfig.TestConfig.TestData.MicrophoneWorking,
                ExtendedAnswer = null,
                QuestionKey = SelfTestQuestionKeys.MicrophoneQuestion
            });
        }
    }
}
