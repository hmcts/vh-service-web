using System.Collections.Generic;
using AcceptanceTests.Common.Data.Questions;
using AcceptanceTests.Common.Driver.Browser;
using AcceptanceTests.Common.Driver.Helpers;
using AcceptanceTests.Common.PageObject.Helpers;
using AcceptanceTests.Common.Test.Steps;
using ServiceWebsite.AcceptanceTests.Data;
using ServiceWebsite.AcceptanceTests.Helpers;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps.SelfTest
{
    [Binding]
    public class VideoWorkingSteps : ISteps
    {
        private readonly Dictionary<string, UserBrowser> _browsers;
        private readonly TestContext _c;

        public VideoWorkingSteps(Dictionary<string, UserBrowser> browsers, TestContext testContext)
        {
            _browsers = browsers;
            _c = testContext;
        }

        [When(@"the user answers yes to the video working question")]
        public void ProgressToNextPage()
        {
            _browsers[_c.CurrentUser.Key].ClickRadioButton(CommonLocators.RadioButtonWithLabel(_c.ServiceWebConfig.TestConfig.TestData.VideoWorking));
            _browsers[_c.CurrentUser.Key].Click(CommonLocators.ButtonWithInnerText("Continue"));
            _c.Test.Answers.Add(new SuitabilityAnswer
            {
                Answer = _c.ServiceWebConfig.TestConfig.TestData.VideoWorking,
                ExtendedAnswer = null,
                QuestionKey = SelfTestQuestionKeys.SeeVideoQuestion
            });
        }
    }
}
