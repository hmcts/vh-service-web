﻿using ServiceWebsite.AcceptanceTests.Pages;
using ServiceWebsite.AcceptanceTests.Pages.IndividualPages;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public sealed class CommonSteps
    {
        private readonly CommonPages _commonPages;
        private readonly BlueInformationScreensSteps _blueInformationScreens;
        private readonly LoginSteps _loginSteps;

        public CommonSteps(CommonPages commonPages, BlueInformationScreensSteps blueInformationScreens,
            LoginSteps loginSteps)
        {
            _loginSteps = loginSteps;
            _blueInformationScreens = blueInformationScreens;
            _commonPages = commonPages;                       
        }
        
        [Given(@"(.*) participant is on camera and microphone page")]
        public void GivenIndividualParticipantIsOnCameraAndMicrophonePage(string participant)
        {
            _loginSteps.WhenIndividualLogsInWithValidCredentials(participant);
            _blueInformationScreens.ThenIndividualShouldViewBlueInformationScreen();
            //Naviagate through the pages with no contents
            _commonPages.Continue();
            IndividualExploreCourtBuilding();
            IndividualViewsCourtBuildingVideo();
            IndividualExploreVideoHearing();
        }

        public void IndividualExploreVideoHearing()
        {
            _commonPages.ValidatePage("/explore-video-hearing");
            _commonPages.Continue();
        }

        public void IndividualExploreCourtBuilding()
        {
            _commonPages.ValidatePage("/explore-court-building");
            _commonPages.Continue();
        }

        public void IndividualViewsCourtBuildingVideo()
        {
            _commonPages.ValidatePage("/court-building-video");
            _commonPages.Continue();
        }
    }
}