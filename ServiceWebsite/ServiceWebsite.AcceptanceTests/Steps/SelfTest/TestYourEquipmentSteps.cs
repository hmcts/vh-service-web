using System.Collections.Generic;
using AcceptanceTests.Common.Data.Questions;
using AcceptanceTests.Common.Driver.Browser;
using AcceptanceTests.Common.Driver.Helpers;
using AcceptanceTests.Common.Test.Helpers;
using AcceptanceTests.Common.Test.Steps;
using FluentAssertions;
using ServiceWebsite.AcceptanceTests.Data;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Pages.SelfTest;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps.SelfTest
{
    [Binding]
    public class TestYourEquipmentSteps : ISteps
    {
        private const int VideoLength = 90;
        private readonly Dictionary<string, UserBrowser> _browsers;
        private readonly TestContext _c;

        public TestYourEquipmentSteps(Dictionary<string, UserBrowser> browsers, TestContext testContext)
        {
            _browsers = browsers;
            _c = testContext;
        }

        public void ProgressToNextPage()
        {
            TheVideoBeginsToPlay();
            _browsers[_c.CurrentUser.Key].ScrollTo(TestYourEquipmentPage.ContinueButton);
            WhenTheVideoHasEnded();
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(TestYourEquipmentPage.ContinueButton).Displayed.Should().BeTrue();
            _browsers[_c.CurrentUser.Key].Click(TestYourEquipmentPage.ContinueButton);
            _c.Test.Answers.Add(new SuitabilityAnswer{ Answer = "None", ExtendedAnswer = null, QuestionKey = SelfTestQuestionKeys.SelfTestScoreQuestion });
        }

        [When(@"the Test Your Equipment video has ended")]
        public void WhenTheVideoHasEnded()
        {
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilElementNotVisible(TestYourEquipmentPage.IncomingStream, VideoLength);
        }

        [Then(@"the Test Your Equipment video begins to play")]
        public void TheVideoBeginsToPlay()
        {
            new VerifyVideoIsPlayingBuilder(_browsers[_c.CurrentUser.Key]).Feed(TestYourEquipmentPage.IncomingStream);
            new VerifyVideoIsPlayingBuilder(_browsers[_c.CurrentUser.Key]).Feed(TestYourEquipmentPage.SelfView);
        }
    }
}
