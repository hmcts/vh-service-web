using System.Collections.Generic;
using FluentAssertions;

namespace ServiceWebsite.AcceptanceTests.Pages.Journeys
{
    public class IndividualJourney : IJourney
    {
        public List<Page> Journey()
        {
            return new List<Page>()
            {
                Page.Login,
                Page.AboutHearings,
                Page.DifferentHearingTypes,
                Page.ExploreCourtBuilding,
                Page.ExploreVideoHearing,
                Page.UseCameraMicrophone,
                Page.ParticipantView,
                Page.HelpTheCourtDecide,
                Page.AboutYou,
                Page.Interpreter,
                Page.YourComputer,
                Page.AboutYourComputer,
                Page.YourInternetConnection,
                Page.AccessToARoom,
                Page.Consent,
                Page.AnswersSaved,
                Page.CheckYourComputer,
                Page.SwitchOnCameraAndMicrophone,
                Page.TestYourEquipment,
                Page.CameraWorking,
                Page.MicrophoneWorking,
                Page.VideoWorking,
                Page.ThankYou
            };
        }

        public void VerifyUserIsApplicableToJourney(string currentUserRole)
        {
            currentUserRole.ToLower().Should().BeOneOf("individual");
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
