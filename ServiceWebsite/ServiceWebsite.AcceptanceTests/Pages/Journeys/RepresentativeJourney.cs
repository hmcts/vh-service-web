using System.Collections.Generic;
using FluentAssertions;
using ServiceWebsite.Services.TestApi;

namespace ServiceWebsite.AcceptanceTests.Pages.Journeys
{
    public class RepresentativeJourney : IJourney
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
                Page.ThankYouRep
            };
        }

        public void VerifyUserIsApplicableToJourney(UserType userType)
        {
            userType.Should().Be(UserType.Representative);
        }

        public void VerifyDestinationIsInThatJourney(Page destinationPage)
        {

            Journey().Should().Contain(destinationPage);
        }

        public Page GetNextPage(Page currentPage)
        {
            return Journey()[Journey().IndexOf(currentPage) + 1];
        }
    }
}
