using System.Collections.Generic;
using FluentAssertions;
using ServiceWebsite.Services.TestApi;

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
                Page.AboutYou,
                Page.Interpreter,
                Page.YourComputer,
                Page.AboutYourComputer,
                Page.YourInternetConnection,
                Page.AccessToARoom,
                Page.Consent,
                Page.AnswersSavedIndividual,
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
