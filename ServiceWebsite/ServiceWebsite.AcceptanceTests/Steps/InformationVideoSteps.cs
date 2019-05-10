using ServiceWebsite.AcceptanceTests.Pages.IndividualPages;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public sealed class InformationVideoSteps
    {
        private readonly UseCameraMicrophone _useCameraMicrophone;
        private readonly ParticipantView _participantView;
        private readonly MediaError _mediaError;
        private readonly HelpTheCourtDecide _helpTheCourtDecide;

        public InformationVideoSteps(UseCameraMicrophone useCameraMicrophone, ParticipantView participantView,
            MediaError mediaError, HelpTheCourtDecide helpTheCourtDecide)
        {
            _useCameraMicrophone = useCameraMicrophone;
            _participantView = participantView;
            _mediaError = mediaError;
            _helpTheCourtDecide = helpTheCourtDecide;
        }

        [When(@"Camera and Microphone are switched on")]
        public void WhenCameraAndMicrophoneAreSwitchedOn()
        {
            _useCameraMicrophone.IndividualSwitchesOnCameraAndMicrophone();
            _useCameraMicrophone.CameraAndMicrophoneAreSwitchedOn();
        }

        [Then(@"Individual participant should be able to view information video")]
        public void ThenIndividualParticipantShouldBeAbleToViewInformationVideo()
        {
            _participantView.IndividualViewsInformationVideo();
            _participantView.VideoHasStarted();

            //Judge page will be removed soon
            _participantView.ShowJudgeView();
            _participantView.JudgeView();
            _helpTheCourtDecide.IndividualHelpCourtDecide();
        }
        [Then(@"Individual participant should not be able to continue with suitability questionnaire")]
        public void ThenIndividualParticipantShouldNotBeAbleToContinueWithSuitabilityQuestionnaire()
        {
            _mediaError.BlockedCameraAndMic();
        }

        [When(@"Camera and Microphone are not switched on")]
        public void WhenCameraAndMicrophoneAreNotSwitchedOn()
        {
            _useCameraMicrophone.IndividualSwitchesOnCameraAndMicrophone();
        }
    }
}