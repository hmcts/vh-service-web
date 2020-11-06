using System.Collections.Generic;
using AcceptanceTests.Common.Test.Steps;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Pages;
using ServiceWebsite.AcceptanceTests.Pages.Journeys;
using ServiceWebsite.AcceptanceTests.Steps.Individual;
using ServiceWebsite.AcceptanceTests.Steps.Representative;
using ServiceWebsite.AcceptanceTests.Steps.SelfTest;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public class ProgressionSteps
    {
        private readonly TestContext _c;
        private readonly BrowserSteps _browsersSteps;
        private readonly LoginSteps _loginSteps;
        private readonly AboutHearingsSteps _aboutHearingSteps;
        private readonly CheckYourComputerSteps _checkYourComputerSteps;
        private readonly SwitchOnCameraMicrophoneSteps _switchOnCameraMicrophoneSteps;
        private readonly TestYourEquipmentSteps _testYourEquipmentSteps;
        private readonly CameraWorkingSteps _cameraWorkingSteps;
        private readonly MicrophoneWorkingSteps _microphoneWorkingSteps;
        private readonly VideoWorkingSteps _videoWorkingSteps;
        private readonly ThankYouSteps _thankYouSteps;
        private readonly YourVideoHearingSteps _yourVideoHearingSteps;
        private readonly PresentingTheCaseSteps _presentingTheCaseSteps;
        private readonly OtherInformationSteps _otherInformationSteps;
        private readonly CheckYourAnswersSteps _checkYourAnswersSteps;
        private readonly AnswersSavedSteps _answersSavedSteps;
        private readonly ThankYouRepSteps _thankYouRepSteps;

        public ProgressionSteps(
            TestContext testContext,
            BrowserSteps browserSteps,
            LoginSteps loginSteps, 
            AboutHearingsSteps aboutHearingSteps, 
            CheckYourComputerSteps checkYourComputerSteps, 
            SwitchOnCameraMicrophoneSteps switchOnCameraMicrophoneSteps, 
            TestYourEquipmentSteps testYourEquipmentSteps, 
            CameraWorkingSteps cameraWorkingSteps, 
            MicrophoneWorkingSteps microphoneWorkingSteps, 
            VideoWorkingSteps videoWorkingSteps, 
            ThankYouSteps thankYouSteps, 
            YourVideoHearingSteps yourVideoHearingSteps, 
            PresentingTheCaseSteps presentingTheCaseSteps, 
            OtherInformationSteps otherInformationSteps, 
            CheckYourAnswersSteps checkYourAnswersSteps,
            AnswersSavedSteps answersSavedSteps, 
            ThankYouRepSteps thankYouRepSteps)
        {
            _c = testContext;
            _browsersSteps = browserSteps;
            _loginSteps = loginSteps;
            _aboutHearingSteps = aboutHearingSteps;
            _checkYourComputerSteps = checkYourComputerSteps;
            _switchOnCameraMicrophoneSteps = switchOnCameraMicrophoneSteps;
            _testYourEquipmentSteps = testYourEquipmentSteps;
            _cameraWorkingSteps = cameraWorkingSteps;
            _microphoneWorkingSteps = microphoneWorkingSteps;
            _videoWorkingSteps = videoWorkingSteps;
            _thankYouSteps = thankYouSteps;
            _yourVideoHearingSteps = yourVideoHearingSteps;
            _presentingTheCaseSteps = presentingTheCaseSteps;
            _otherInformationSteps = otherInformationSteps;
            _checkYourAnswersSteps = checkYourAnswersSteps;
            _answersSavedSteps = answersSavedSteps;
            _thankYouRepSteps = thankYouRepSteps;
        }

        [Given(@"the (.*) has progressed to the (.*) page")]
        public void GivenIAmOnThePage(string user, string page)
        {
            _browsersSteps.GivenANewBrowserIsOpenFor(user);
            Progression(FromString(user), "Login", page);
        }

        [When(@"the (.*) progresses from the (.*) page to the (.*) page")]
        public void WhenProgressesFromPageToAnotherPage(string user, string from, string to)
        {
            Progression(FromString(user), from, to);
        }

        private static Journey FromString(string user)
        {
            return user.ToLower().Equals("individual") ? Journey.Individual : Journey.Representative;
        }

        private void Progression(Journey userJourney, string startPageAsString, string endPageAsString)
        {
            var startPage = Page.FromString(startPageAsString);
            var startPageReached = false;
            var endPage = Page.FromString(endPageAsString);
            var journeys = new Dictionary<Journey, IJourney>
            {
                {Journey.Individual, new IndividualJourney()},
                {Journey.Representative, new RepresentativeJourney()}
            };
            journeys[userJourney].VerifyUserIsApplicableToJourney(_c.CurrentUser.User_type);
            journeys[userJourney].VerifyDestinationIsInThatJourney(endPage);
            var journey = journeys[userJourney].Journey();
            var steps = Steps();
            foreach (var page in journey)
            {
                if (!startPageReached)
                {
                    if (page.Equals(startPage))
                    {
                        startPageReached = true;
                    }
                    else
                    {
                        continue;
                    }
                }
                if (page != Page.Login) _browsersSteps.ThenTheUserIsOnThePage(page.Name);
                if (page.Equals(endPage)) break;
                steps[page].ProgressToNextPage();
            }
        }

        private Dictionary<Page, ISteps> Steps()
        {
            return new Dictionary<Page, ISteps>
            {
                { Page.Login, _loginSteps },
                { Page.AboutHearings, _aboutHearingSteps },
                { Page.CheckYourComputer, _checkYourComputerSteps },
                { Page.SwitchOnCameraAndMicrophone, _switchOnCameraMicrophoneSteps },
                { Page.TestYourEquipment, _testYourEquipmentSteps },
                { Page.CameraWorking, _cameraWorkingSteps },
                { Page.MicrophoneWorking, _microphoneWorkingSteps },
                { Page.VideoWorking, _videoWorkingSteps },
                { Page.ThankYou, _thankYouSteps },
                { Page.YourVideoHearing, _yourVideoHearingSteps },
                { Page.PresentingTheCase, _presentingTheCaseSteps },
                { Page.OtherInformation, _otherInformationSteps },
                { Page.CheckYourAnswers, _checkYourAnswersSteps },
                { Page.AnswersSaved, _answersSavedSteps },
                { Page.ThankYouRep, _thankYouRepSteps }
            };
        }
    }
}
