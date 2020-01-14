using System;
using System.Collections.Generic;
using AcceptanceTests.Common.Driver.Browser;
using AcceptanceTests.Common.Driver.Helpers;
using AcceptanceTests.Common.PageObject.Helpers;
using AcceptanceTests.Common.Test.Helpers;
using AcceptanceTests.Common.Test.Steps;
using FluentAssertions;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Pages;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps.Individual
{
    [Binding]
    public class ParticipantViewSteps : ISteps
    {
        private readonly Dictionary<string, UserBrowser> _browsers;
        private readonly TestContext _c;
        private readonly ParticipantViewPage _participantViewPage;
        private double _originalVideoTime;

        public ParticipantViewSteps(Dictionary<string, UserBrowser> browsers, TestContext testContext, ParticipantViewPage participantViewPage)
        {
            _browsers = browsers;
            _c = testContext;
            _participantViewPage = participantViewPage;
        }

        public void ProgressToNextPage()
        {
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(CommonLocators.ButtonWithInnerText("Continue")).Click();
        }

        [Then(@"the participant view video begins to play")]
        public void ThenTheParticipantViewVideoBeginsToPlay()
        {
            new VerifyVideoIsPlayingBuilder(_browsers[_c.CurrentUser.Key]).Feed(_participantViewPage.Video);
            _originalVideoTime = Convert.ToDouble(_browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(_participantViewPage.Video).GetAttribute("currentTime"));
            new VerifyVideoIsPlayingBuilder(_browsers[_c.CurrentUser.Key]).Feed(_participantViewPage.SelfCameraView);
        }

        [Then(@"the video restarts")]
        public void ThenTheVideoRestarts()
        {
            var currentVideoTime = Convert.ToDouble(_browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(_participantViewPage.Video).GetAttribute("currentTime"));
            currentVideoTime.Should().BeLessThan(_originalVideoTime);
        }
    }
}
