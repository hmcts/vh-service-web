using System;
using System.Collections.Generic;
using AcceptanceTests.Common.Driver.Drivers;
using AcceptanceTests.Common.Driver.Helpers;
using AcceptanceTests.Common.PageObject.Helpers;
using AcceptanceTests.Common.Test.Helpers;
using AcceptanceTests.Common.Test.Steps;
using FluentAssertions;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Pages.Individual;
using ServiceWebsite.Services.TestApi;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps.Individual
{
    [Binding]
    public class ParticipantViewSteps : ISteps
    {
        private readonly Dictionary<User, UserBrowser> _browsers;
        private readonly TestContext _c;
        private double _originalVideoTime;

        public ParticipantViewSteps(Dictionary<User, UserBrowser> browsers, TestContext testContext)
        {
            _browsers = browsers;
            _c = testContext;
        }

        public void ProgressToNextPage()
        {
            _browsers[_c.CurrentUser].Click(CommonLocators.ButtonWithInnerText("Continue"));
        }

        [Then(@"the participant view video begins to play")]
        public void ThenTheParticipantViewVideoBeginsToPlay()
        {
            new VerifyVideoIsPlayingBuilder(_browsers[_c.CurrentUser]).Feed(ParticipantViewPage.Video);
            _originalVideoTime = Convert.ToDouble(_browsers[_c.CurrentUser].Driver.WaitUntilVisible(ParticipantViewPage.Video).GetAttribute("currentTime"));
            new VerifyVideoIsPlayingBuilder(_browsers[_c.CurrentUser]).Feed(ParticipantViewPage.SelfCameraView);
        }

        [Then(@"the video restarts")]
        public void ThenTheVideoRestarts()
        {
            var currentVideoTime = Convert.ToDouble(_browsers[_c.CurrentUser].Driver.WaitUntilVisible(ParticipantViewPage.Video).GetAttribute("currentTime"));
            currentVideoTime.Should().BeLessThan(_originalVideoTime);
        }
    }
}
