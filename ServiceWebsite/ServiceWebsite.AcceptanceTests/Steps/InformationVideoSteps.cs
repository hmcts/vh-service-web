using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Pages;
using ServiceWebsite.AcceptanceTests.Pages.IndividualPages;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public sealed class InformationVideoSteps
    {
        private readonly VideoContentPage _participantView;
        private readonly JudgeView _judgeView;
        private readonly JourneyStepPage _helpTheCourtDecide;
        public InformationVideoSteps(BrowserContext browserContext, JudgeView judgeView)
        {
            _participantView = new VideoContentPage(browserContext, PageUri.ParticipantViewPage);
            _judgeView = judgeView;
            _helpTheCourtDecide = new JourneyStepPage(browserContext, PageUri.HelpTheCourtDecidePage);
        }

        [Then(@"Individual participant should be able to view information video")]
        public void ThenIndividualParticipantShouldBeAbleToViewInformationVideo()
        {
            _participantView.VideoHasStarted();
            _participantView.Continue();
            _judgeView.VideoHasStarted();
            _judgeView.Continue();
            _helpTheCourtDecide.Continue();

        }
    }
}