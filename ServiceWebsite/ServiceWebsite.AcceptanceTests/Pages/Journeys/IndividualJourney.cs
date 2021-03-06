using System.Collections.Generic;
using FluentAssertions;
using TestApi.Contract.Enums;

namespace ServiceWebsite.AcceptanceTests.Pages.Journeys
{
    public class IndividualJourney : IJourney
    {
        public List<Page> Journey()
        {
            return new List<Page>()
            {
                Page.Login,
                Page.CheckingVideoHearing,
                Page.CheckYourComputer,
                Page.SwitchOnCameraAndMicrophone,
                Page.TestYourEquipment,
                Page.CameraWorking,
                Page.MicrophoneWorking,
                Page.VideoWorking,
                Page.ThankYou
            };
        }

        public void VerifyUserIsApplicableToJourney(UserType userType)
        {
            userType.ToString().ToLower().Should().BeOneOf("participant", "individual", "panel member", "observer");
        }

        public void VerifyDestinationIsInThatJourney(Page destinationPage)
        {
            Journey().Should().Contain(destinationPage);
        }
    }
}
