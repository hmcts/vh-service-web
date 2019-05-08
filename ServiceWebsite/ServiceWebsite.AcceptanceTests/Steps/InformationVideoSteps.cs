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

        public InformationVideoSteps(UseCameraMicrophone useCameraMicrophone, ParticipantView participantView,
            MediaError mediaError)
        {
            _useCameraMicrophone = useCameraMicrophone;
            _participantView = participantView;
            _mediaError = mediaError;
        }

        [When(@"Camera and Microphone is switched on")]
        public void WhenCameraAndMicrophoneIsSwitchedOn()
        {
            _useCameraMicrophone.IndividualSwitchesOnCameraAndMicrophone();
            _useCameraMicrophone.CameraAndMicrophoneAreSwitchedOn();
        }

        [Then(@"Individual participant should be able to view information video")]
        public void ThenIndividualParticipantShouldBeAbleToViewInformationVideo()
        {
            _participantView.IndividualViewsInformationVideo();
        }
        [Then(@"Individual participant should not be able to continue with suitability questionnaire")]
        public void ThenIndividualParticipantShouldNotBeAbleToContinueWithSuitabilityQuestionnaire()
        {
            _mediaError.BlockedCameraAndMic();
        }
    }
}