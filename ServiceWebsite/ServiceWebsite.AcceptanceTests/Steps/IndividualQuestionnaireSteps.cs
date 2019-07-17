using ServiceWebsite.AcceptanceTests.Constants;
using ServiceWebsite.AcceptanceTests.Contexts;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Navigation;
using ServiceWebsite.AcceptanceTests.Pages;
using ServiceWebsite.BookingsAPI.Client;
using System;
using System.Collections.Generic;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public sealed class IndividualQuestionnaireSteps : QuestionnaireJourney
    {

        private readonly DecisionJourney _aboutYou;
        private DecisionJourney _currentPage;
        private readonly DecisionJourney _interpreter;
        private readonly DecisionJourney _yourComputer;
        private readonly DecisionJourney _aboutYourComputer;
        private readonly InformationSteps _information;
        private readonly DecisionJourney _yourInternetConnection;
        private readonly DecisionJourney _accessToRoom;
        private readonly DecisionJourney _consent;
        private readonly DecisionJourney _checkYourComputer;
        private readonly DecisionJourney _switchOnCameraAndMicrophone;
        private readonly DecisionJourney _testYourEquipment;
        private readonly DecisionJourney _cameraWorking;
        private readonly DecisionJourney _microphoneWorking;
        private readonly DecisionJourney _videoWorking;
        private readonly DecisionJourney _signInOnComputer;
        private readonly DecisionJourney _signBackIn;
        private readonly TestContext _testContext;

        public IndividualQuestionnaireSteps(TestContext testContext, BrowserContext browserContext, InformationSteps information, ScenarioContext scenarioContext) : base(testContext, browserContext, information, scenarioContext)
        {
            _aboutYou = new DecisionJourney(browserContext, PageUri.AboutYouPage);
            _interpreter = new DecisionJourney(browserContext, PageUri.InterpreterPage);
            _yourComputer = new DecisionJourney(browserContext, PageUri.YourComputerPage);
            _aboutYourComputer = new DecisionJourney(browserContext, PageUri.AboutYourComputerPage);
            _information = information;
            _yourInternetConnection = new DecisionJourney(browserContext, PageUri.YourInternetConnectionPage);
            _accessToRoom = new DecisionJourney(browserContext, PageUri.AccessToARoomPage);
            _consent = new DecisionJourney(browserContext, PageUri.ConsentPage);
            _checkYourComputer = new DecisionJourney(browserContext, PageUri.CheckYourComputer);
            _switchOnCameraAndMicrophone = new DecisionJourney(browserContext, PageUri.SwitchOnCameraAndMicrophone);
            _testYourEquipment = new DecisionJourney(browserContext, PageUri.TestYourEquipment);
            _cameraWorking = new DecisionJourney(browserContext, PageUri.CameraWorking);
            _microphoneWorking = new DecisionJourney(browserContext, PageUri.MicrophoneWorking);
            _videoWorking = new DecisionJourney(browserContext, PageUri.VideoWorking);
            _signInOnComputer = new DecisionJourney(browserContext, PageUri.SignInOncomputer);
            _signBackIn = new DecisionJourney(browserContext, PageUri.SignBackIn);
            _testContext = testContext;
        }

        [Given(@"Individual participant is on '(.*)' page")]
        public void GivenIndividualParticipantIsOnPages(string page)
        {
            _information.InformationScreen("Individual");
            InitiateJourneySteps(page);
        }


        public void InitiateJourneySteps(string page)
        {
            switch (page)
            {
                case IndividualPageNames.AboutYou:
                    _aboutYou.Validate();
                    _currentPage = _aboutYou;
                    break;
                case IndividualPageNames.Interpreter:
                    NavigateToDecisionPage(_aboutYou);
                    _currentPage = _interpreter;
                    break;
                case IndividualPageNames.YourComputer:
                    NavigateToDecisionPage(_aboutYou);
                    NavigateToDecisionPage(_interpreter);
                    _currentPage = _yourComputer;
                    break;
                case IndividualPageNames.AboutYourComputer:
                    NavigateToDecisionPage(_aboutYou);
                    NavigateToDecisionPage(_interpreter);
                    NavigateToDecisionPage(_yourComputer);
                    _currentPage = _aboutYourComputer;
                    break;
                case IndividualPageNames.YourInternetConnection:
                    NavigateToDecisionPage(_aboutYou);
                    NavigateToDecisionPage(_interpreter);
                    NavigateToDecisionPage(_yourComputer);
                    NavigateToDecisionPage(_aboutYourComputer);
                    _currentPage = _yourInternetConnection;
                    break;
                case IndividualPageNames.AccessToARoom:
                    NavigateToDecisionPage(_aboutYou);
                    NavigateToDecisionPage(_interpreter);
                    NavigateToDecisionPage(_yourComputer);
                    NavigateToDecisionPage(_aboutYourComputer);
                    NavigateToDecisionPage(_yourInternetConnection);
                    _currentPage = _accessToRoom;
                    break;
                case IndividualPageNames.Consent:
                    NavigateToDecisionPage(_aboutYou);
                    NavigateToDecisionPage(_interpreter);
                    NavigateToDecisionPage(_yourComputer);
                    NavigateToDecisionPage(_aboutYourComputer);
                    NavigateToDecisionPage(_yourInternetConnection);
                    NavigateToDecisionPage(_accessToRoom);
                    _currentPage = _consent;
                    break;
                case SelfTestPageNames.CheckYourComputer:
                    NavigateToDecisionPage(_aboutYou);
                    NavigateToDecisionPage(_interpreter);
                    NavigateToDecisionPage(_yourComputer);
                    NavigateToDecisionPage(_aboutYourComputer);
                    NavigateToDecisionPage(_yourInternetConnection);
                    NavigateToDecisionPage(_accessToRoom);
                    NavigateToDecisionPage(_consent);
                    _currentPage = _checkYourComputer;
                    break;
            }
            _scenarioContext.Set<DecisionJourney>(_currentPage, "CurrentPage");
        }

        [Then(@"Participant should proceed to about you page")]
        public void ThenParticipantShouldProceedToAboutYouPage()
        {
            _aboutYou.Validate();
        }

        [Then(@"Individual should be on '(.*)' screen")]
        public void ThenParticipantShouldProceedToPage(string page)
        {

            switch (page)
            {
                case IndividualPageNames.AboutYou:
                    _aboutYou.Validate();
                    break;
                case IndividualPageNames.Interpreter:
                    _interpreter.Validate();
                    break;
                case IndividualPageNames.YourComputer:
                    _yourComputer.Validate();
                    break;
                case IndividualPageNames.ThankYou:
                    _thankYou.Validate();
                    break;
                case IndividualPageNames.AboutYourComputer:
                    _aboutYourComputer.Validate();
                    break;
                case IndividualPageNames.YourInternetConnection:
                    _yourInternetConnection.Validate();
                    break;
                case IndividualPageNames.AccessToARoom:
                    _accessToRoom.Validate();
                    break;
                case IndividualPageNames.Consent:
                    _consent.Validate();
                    _currentPage = _consent;
                    break;
                case SelfTestPageNames.CheckYourComputer:
                    _checkYourComputer.Validate();
                    _currentPage = _checkYourComputer;
                    break;
                case SelfTestPageNames.SwitchOnCameraAndMicrophone:
                    _switchOnCameraAndMicrophone.Validate();
                    _currentPage = _switchOnCameraAndMicrophone;
                    break;
                case SelfTestPageNames.TestYourEquipment:
                    _testYourEquipment.Validate();
                    _currentPage = _testYourEquipment;
                    break;
                case SelfTestPageNames.CameraWorking:
                    _cameraWorking.Validate();
                    _currentPage = _cameraWorking;
                    break;
                case SelfTestPageNames.MicrophoneWorking:
                    _microphoneWorking.Validate();
                    _currentPage = _microphoneWorking;
                    break;
                case SelfTestPageNames.VideoWorking:
                    _videoWorking.Validate();
                    _currentPage = _videoWorking;
                    break;
                case SelfTestPageNames.SignBackIn:
                    _currentPage = _signBackIn;
                    break;
                case SelfTestPageNames.SignInOncomputer:
                    _currentPage = _signInOnComputer;
                    break;
            }
            _scenarioContext.Set(_currentPage, "CurrentPage");
        }

        [When(@"Individual provides additional information for not consenting to video hearing as '(.*)'")]
        public void WhenIndividualProvidesAdditionalInformationForNotConsentingToVideoHearingAs(string detail)
        {
            _aboutYou.SelectNo(detail);
        }

        [Given(@"Individual participant has already submitted questionnaire but not completed self-test")]
        public void GivenIndividualParticipantHasAlreadySubmittedQuestionnaireButNotCompletedSelf_Test()
        {
            //Submit the answers for individual
            var answerRequestBody = new List<SuitabilityAnswersRequest>();
            answerRequestBody.Add(CreateSuitabilityAnswersRequest("ABOUT_YOU", "false", null));
            answerRequestBody.Add(CreateSuitabilityAnswersRequest("INTERPRETER", "false", null));
            answerRequestBody.Add(CreateSuitabilityAnswersRequest("ROOM", "true", null));
            answerRequestBody.Add(CreateSuitabilityAnswersRequest("COMPUTER", "true", null));
            answerRequestBody.Add(CreateSuitabilityAnswersRequest("CAMERA_MICROPHONE", "Yes", null));
            answerRequestBody.Add(CreateSuitabilityAnswersRequest("INTERNET", "true", null));
            answerRequestBody.Add(CreateSuitabilityAnswersRequest("CONSENT", "true", null));

            SubmitSuitabilityAnswers(_testContext.IndividualParticipantId, answerRequestBody);
        }

        protected override bool ShouldSelectYes(DecisionJourney decisionJourneyPage)
        {
            return (decisionJourneyPage == _yourComputer || 
                    decisionJourneyPage == _aboutYourComputer || 
                    decisionJourneyPage == _yourInternetConnection ||
                    decisionJourneyPage == _consent);
        }
    }
}