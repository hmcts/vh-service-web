using System.Collections.Generic;
using AcceptanceTests.Common.Data.Questions;
using AcceptanceTests.Common.Driver.Drivers;
using AcceptanceTests.Common.Driver.Helpers;
using AcceptanceTests.Common.Test.Helpers;
using AcceptanceTests.Common.Test.Steps;
using FluentAssertions;
using ServiceWebsite.AcceptanceTests.Data;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Pages.SelfTest;
using ServiceWebsite.Services.TestApi;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps.SelfTest
{
    [Binding]
    public class TestYourEquipmentSteps : ISteps
    {
        private const int ExtraTimeForVideoToLoad = 30;
        private const int VideoLength = 90;
        private readonly Dictionary<User, UserBrowser> _browsers;
        private readonly TestContext _c;

        public TestYourEquipmentSteps(Dictionary<User, UserBrowser> browsers, TestContext testContext)
        {
            _browsers = browsers;
            _c = testContext;
        }

        public void ProgressToNextPage()
        {
            TheVideoBeginsToPlay();
            _browsers[_c.CurrentUser].Driver.WaitUntilVisible(TestYourEquipmentPage.ContinueButton);
            _browsers[_c.CurrentUser].ScrollTo(TestYourEquipmentPage.ContinueButton);
            WhenTheVideoHasEnded();
            _browsers[_c.CurrentUser].Driver.WaitUntilVisible(TestYourEquipmentPage.ContinueButton).Displayed.Should().BeTrue();
            _browsers[_c.CurrentUser].Click(TestYourEquipmentPage.ContinueButton);
            _c.Test.Answers.Add(new SuitabilityAnswer{ Answer = "None", ExtendedAnswer = null, QuestionKey = SelfTestQuestionKeys.SelfTestScoreQuestion });
        }

        [When(@"the Test Your Equipment video has ended")]
        public void WhenTheVideoHasEnded()
        {
            _browsers[_c.CurrentUser].Driver.WaitUntilElementNotVisible(TestYourEquipmentPage.IncomingStream, VideoLength);
        }

        [Then(@"the Test Your Equipment video begins to play")]
        public void TheVideoBeginsToPlay()
        {
            new VerifyVideoIsPlayingBuilder(_browsers[_c.CurrentUser]).Retries(ExtraTimeForVideoToLoad).Feed(TestYourEquipmentPage.IncomingStream);
            new VerifyVideoIsPlayingBuilder(_browsers[_c.CurrentUser]).Feed(TestYourEquipmentPage.SelfView);
        }
    }
}
