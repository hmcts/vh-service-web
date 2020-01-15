using System.Collections.Generic;
using AcceptanceTests.Common.Driver.Browser;
using AcceptanceTests.Common.Driver.Helpers;
using AcceptanceTests.Common.PageObject.Helpers;
using AcceptanceTests.Common.Test.Helpers;
using AcceptanceTests.Common.Test.Steps;
using FluentAssertions;
using ServiceWebsite.AcceptanceTests.Data;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Pages.SelfTest;
using ServiceWebsite.AcceptanceTests.Questions;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps.SelfTest
{
    [Binding]
    public class TestYourEquipmentSteps : ISteps
    {
        private const int Timeout = 60;
        private readonly Dictionary<string, UserBrowser> _browsers;
        private readonly TestContext _c;

        public TestYourEquipmentSteps(Dictionary<string, UserBrowser> browsers, TestContext testContext)
        {
            _browsers = browsers;
            _c = testContext;
        }

        public void ProgressToNextPage()
        {
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(TestYourEquipmentPage.IncomingStream).Displayed.Should().BeTrue();
            _browsers[_c.CurrentUser.Key].ScrollTo(CommonLocators.ButtonWithInnerText("Continue"));
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(CommonLocators.ButtonWithInnerText("Continue")).Click();
            _c.Test.Answers.Add(new SuitabilityAnswer{ Answer = "None", ExtendedAnswer = null, QuestionKey = SelfTestQuestionKeys.SelfTestScoreQuestion });
        }

        [When(@"the Test Your Equipment video has ended")]
        public void WhenTheVideoHasEnded()
        {
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilElementNotVisible(TestYourEquipmentPage.IncomingStream, Timeout);
        }

        [Then(@"the Test Your Equipment video begins to play")]
        public void ThenTheExploringTheCourtBuildingVideoBeginsToPlay()
        {
            new VerifyVideoIsPlayingBuilder(_browsers[_c.CurrentUser.Key]).Feed(TestYourEquipmentPage.IncomingStream);
            new VerifyVideoIsPlayingBuilder(_browsers[_c.CurrentUser.Key]).Feed(TestYourEquipmentPage.SelfView);
        }
    }
}
