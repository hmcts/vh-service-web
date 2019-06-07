using ServiceWebsite.AcceptanceTests.Navigation;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Pages;
using ServiceWebsite.AcceptanceTests.Pages.IndividualPages;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public sealed class InformationSteps
    {
        private readonly JourneyStepPage _aboutHearings;
        private readonly JourneyStepPage _differentHearingTypesPage;
        private readonly JourneyStepPage _exploreCourtBuildingPage;
        private readonly VideoContentPage _courtBuildingVideoPage;
        private readonly JourneyStepPage _exploreVideoHearing;
        private readonly UseCameraMicrophone _useCameraMicrophonePage;
        private readonly Page _mediaError;
        private readonly LoginSteps _loginSteps;
        private readonly VideoContentPage _participantView;
        private readonly JourneyStepPage _helpTheCourtDecide;

        public InformationSteps(BrowserContext browserContext, LoginSteps loginSteps, UseCameraMicrophone useCameraMicrophone)
        {
            _aboutHearings = new JourneyStepPage(browserContext, PageUri.AboutHearingsPage);
            _differentHearingTypesPage = new JourneyStepPage(browserContext, PageUri.DifferentHearingTypesPage);
            _exploreCourtBuildingPage = new JourneyStepPage(browserContext, PageUri.ExploreCourtBuildingPage);
            _courtBuildingVideoPage = new VideoContentPage(browserContext, PageUri.CourtBuildingVideoPage);
            _exploreVideoHearing = new JourneyStepPage(browserContext, PageUri.ExploreVideoHearing);
            _useCameraMicrophonePage = useCameraMicrophone;
            _loginSteps = loginSteps;
            _mediaError = new Page(browserContext, PageUri.MediaErrorPage);
            _participantView = new VideoContentPage(browserContext, PageUri.ParticipantViewPage);
            _helpTheCourtDecide = new JourneyStepPage(browserContext, PageUri.HelpTheCourtDecidePage);
        }

        [Given(@"(.*) participant proceeds to camera and microphone page")]
        public void GivenIndividualParticipantProceedsToCameraAndMicrophonePage(string participant)
        {
            _loginSteps.WhenIndividualLogsInWithValidCredentials(participant);
            ExploreVideoHearing();
        }

        [Then(@"Individual participant should not be able to continue with suitability questionnaire")]
        public void ThenIndividualParticipantShouldNotBeAbleToContinueWithSuitabilityQuestionnaire()
        {
            _mediaError.Validate();
        }

        [When(@"Camera and Microphone are switched on")]
        public void WhenCameraAndMicrophoneAreSwitchedOn()
        {
            _useCameraMicrophonePage.IndividualSwitchesOnCameraAndMicrophone();
            _useCameraMicrophonePage.Continue();
        }

        [When(@"Camera and Microphone are not switched on")]
        public void WhenCameraAndMicrophoneAreNotSwitchedOn()
        {
            _useCameraMicrophonePage.IndividualSwitchesOnCameraAndMicrophone();
        }

        [Then(@"Individual participant should be able to view information video")]
        public void ThenIndividualParticipantShouldBeAbleToViewInformationVideo()
        {
            _participantView.VideoHasStarted();
            _participantView.Continue();
            _helpTheCourtDecide.Continue();
        }

        private void ExploreVideoHearing()
        {
            _aboutHearings.Continue();
            _differentHearingTypesPage.Continue();
            _exploreCourtBuildingPage.Continue();
            _courtBuildingVideoPage.VideoHasStarted();
            _courtBuildingVideoPage.Continue();
            _exploreVideoHearing.Continue();
        }

        public void InformationScreen(string participant)
        {
            GivenIndividualParticipantProceedsToCameraAndMicrophonePage(participant);
            WhenCameraAndMicrophoneAreSwitchedOn();
            ThenIndividualParticipantShouldBeAbleToViewInformationVideo();
        }
    }
}