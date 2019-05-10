using ServiceWebsite.AcceptanceTests.Pages.IndividualPages;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public sealed class CommonSteps
    {
        private readonly BlueInformationScreensSteps _blueInformationScreens;
        private readonly LoginSteps _loginSteps;
        private readonly ExploreCourtBuilding _courtBuilding;
        private readonly CourtBuildingVideo _courtBuildingVideo;
        private readonly ExploreVideoHearing _exploreVideoHearing;

        public CommonSteps(BlueInformationScreensSteps blueInformationScreens,
            LoginSteps loginSteps, ExploreCourtBuilding courtBuilding,
            CourtBuildingVideo courtBuildingVideo, ExploreVideoHearing exploreVideoHearing)
        {
            _loginSteps = loginSteps;
            _blueInformationScreens = blueInformationScreens;
            _courtBuilding = courtBuilding;
            _courtBuildingVideo = courtBuildingVideo;
            _exploreVideoHearing = exploreVideoHearing;
        }
        
        [Given(@"(.*) participant is on camera and microphone page")]
        public void GivenIndividualParticipantIsOnCameraAndMicrophonePage(string participant)
        {
            _loginSteps.WhenIndividualLogsInWithValidCredentials(participant);
            _blueInformationScreens.ThenIndividualShouldViewBlueInformationScreen();
            _courtBuilding.Continue();
            _courtBuildingVideo.Continue();
        }
    }
}