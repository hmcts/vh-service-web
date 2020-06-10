using System.Collections.Generic;
using AcceptanceTests.Common.Data.Questions;
using AcceptanceTests.Common.Driver.Drivers;
using AcceptanceTests.Common.PageObject.Helpers;
using AcceptanceTests.Common.Test.Steps;
using ServiceWebsite.AcceptanceTests.Data;
using ServiceWebsite.AcceptanceTests.Helpers;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps.SelfTest
{
    [Binding]
    public class CameraWorkingSteps : ISteps
    {
        private readonly Dictionary<string, UserBrowser> _browsers;
        private readonly TestContext _c;

        public CameraWorkingSteps(Dictionary<string, UserBrowser> browsers, TestContext testContext)
        {
            _browsers = browsers;
            _c = testContext;
        }

        [When(@"the user answers yes to the camera working question")]
        public void ProgressToNextPage()
        {
            _browsers[_c.CurrentUser.Key].ClickRadioButton(CommonLocators.RadioButtonWithLabel(_c.WebConfig.TestConfig.TestData.CameraWorking));
            _browsers[_c.CurrentUser.Key].Click(CommonLocators.ButtonWithInnerText("Continue"));
            _c.Test.Answers.Add(new SuitabilityAnswer{ Answer = _c.WebConfig.TestConfig.TestData.CameraWorking, ExtendedAnswer = null, QuestionKey = SelfTestQuestionKeys.SeeYourselfQuestion });
        }
    }
}
