using FluentAssertions;
using OpenQA.Selenium;
using ServiceWebsite.AcceptanceTests.Constants;
using ServiceWebsite.AcceptanceTests.Contexts;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Navigation;
using ServiceWebsite.AcceptanceTests.Pages;
using ServiceWebsite.BookingsAPI.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Assist;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public sealed class RepresentativeQuestionnaireSteps : QuestionnaireJourney
    {
        private DecisionJourney _currentPage;
        private readonly InformationSteps _information;
        private readonly DecisionJourney _aboutVideoHearings;
        private readonly DecisionJourney _aboutYouAndYouClient;
        private readonly DecisionJourney _aboutYou;
        private readonly DecisionJourney _accessToRoom;
        private readonly DecisionJourney _aboutYourClient;
        private readonly DecisionJourney _clientAttendance;
        private readonly DecisionJourney _hearingSuitability;
        private readonly DecisionJourney _yourComputer;
        private readonly DecisionJourney _aboutYourComputer;
        private readonly DecisionJourney _questionnaireCompleted;
        private readonly Page _thankYou;
        private readonly Page _pleaseContactUs;
        private readonly DecisionJourney _checkYourComputer;
        private readonly DecisionJourney _switchOnCameraAndMicrophone;
        private readonly DecisionJourney _testYourEquipment;
        private readonly DecisionJourney _cameraWorking;
        private readonly DecisionJourney _microphoneWorking;
        private readonly DecisionJourney _videoWorking;
        private readonly Page _signInOnComputer;
        private readonly Page _signBackIn;
        private readonly Page _equipmentBlocked;
        private string _key = string.Empty;
        private readonly BrowserContext _browserContext;
        private readonly TestContext _testContext;
        private string _representativeParticipantId;
        private readonly LoginSteps _loginSteps;

        public RepresentativeQuestionnaireSteps(LoginSteps loginSteps, TestContext testContext, BrowserContext browserContext, ErrorMessage errorMessage, InformationSteps information, ScenarioContext scenarioContext) : base(testContext, browserContext, information, scenarioContext)
        {
            _information = information;
            _browserContext = browserContext;
            _aboutVideoHearings = new DecisionJourney(browserContext, RepresentativePageUrl.AboutVideoHearings);
            _aboutYouAndYouClient = new DecisionJourney(browserContext, RepresentativePageUrl.AboutYouAndYourClient, RepresentativeQuestionKeys.AboutYourClient);
            _aboutYou = new DecisionJourney(browserContext, RepresentativePageUrl.AboutYou, RepresentativeQuestionKeys.AboutYou);
            _accessToRoom = new DecisionJourney(browserContext, RepresentativePageUrl.AccessToRoom, RepresentativeQuestionKeys.AccessToRoom);
            _aboutYourClient = new DecisionJourney(browserContext, RepresentativePageUrl.AboutYourClient, RepresentativeQuestionKeys.AboutYourClient);
            _clientAttendance = new DecisionJourney(browserContext, RepresentativePageUrl.ClientAttendance, RepresentativeQuestionKeys.ClientAttendance);
            _hearingSuitability = new DecisionJourney(browserContext, RepresentativePageUrl.HearingSuitability, RepresentativeQuestionKeys.HearingSuitability);
            _yourComputer = new DecisionJourney(browserContext, RepresentativePageUrl.YourComputerRep, RepresentativeQuestionKeys.YourComputer);
            _aboutYourComputer = new DecisionJourney(browserContext, RepresentativePageUrl.AboutYourComputerRep, RepresentativeQuestionKeys.AboutYourComputer);
            _questionnaireCompleted = new DecisionJourney(browserContext, RepresentativePageUrl.QuestionnaireCompleted);
            _thankYou = new Page(browserContext, RepresentativePageUrl.ThankYouRep);
            _pleaseContactUs = new Page(browserContext, RepresentativePageUrl.PleaseContactUs);
            _checkYourComputer = new DecisionJourney(browserContext, PageUri.CheckYourComputer);
            _switchOnCameraAndMicrophone = new DecisionJourney(browserContext, PageUri.SwitchOnCameraAndMicrophone);
            _testYourEquipment = new DecisionJourney(browserContext, PageUri.TestYourEquipment);
            _cameraWorking = new DecisionJourney(browserContext, PageUri.CameraWorking);
            _microphoneWorking = new DecisionJourney(browserContext, PageUri.MicrophoneWorking);
            _videoWorking = new DecisionJourney(browserContext, PageUri.VideoWorking);
            _signInOnComputer = new Page(browserContext, PageUri.SignInOncomputer);
            _signBackIn = new Page(browserContext, PageUri.SignBackIn);
            _equipmentBlocked = new Page(browserContext, PageUri.EquipmentBlocked);
            _testContext = testContext;
            _representativeParticipantId =  _testContext.RepresentativeParticipantId;
            _loginSteps = loginSteps;
        }
        
        [Given(@"Representative participant is on '(.*)' page")]
        public void GivenRepresentativeParticipantIsOnPage(string page)
        {
            _information.InformationScreen("Representative");
            InitiateJourneySteps(page);
        }

        [Given(@"Representative participant is on '(.*)' page having submitted questionnaire")]
        public void GivenRepresentativeParticipantIsOnPageHavingSubmittedQuestionnaire(string page)
        {
            SubmitQuestionnaireForPositivePath();
            _loginSteps.WhenParticipantLogsInWithValidCredentials("Representative");
            NavigateToDecisionPage(_checkYourComputer);
            _currentPage = _switchOnCameraAndMicrophone;
        }

        public void InitiateJourneySteps(string page)
        {
            switch (page)
            {
                case RepresentativePageNames.AboutYou:
                    _aboutYou.Validate();
                    _currentPage = _aboutYou;
                    break;
                case RepresentativePageNames.AboutYourClient:
                    NavigateToDecisionPage(_aboutYou);
                    NavigateToDecisionPage(_accessToRoom);
                    _currentPage = _aboutYourClient;
                    break;
                case RepresentativePageNames.ClientAttendance:
                    NavigateToDecisionPage(_aboutYou);
                    NavigateToDecisionPage(_accessToRoom);
                    NavigateToDecisionPage(_aboutYourClient);
                    _currentPage = _clientAttendance;
                    break;
                case RepresentativePageNames.HearingSuitability:
                    NavigateToDecisionPage(_aboutYou);
                    NavigateToDecisionPage(_accessToRoom);
                    NavigateToDecisionPage(_aboutYourClient);
                    NavigateToDecisionPage(_clientAttendance);
                    _currentPage = _hearingSuitability;
                    break;
                case RepresentativePageNames.AccessToRoom:
                    NavigateToDecisionPage(_aboutYou);
                    _currentPage = _accessToRoom;
                    break;
                case RepresentativePageNames.YourComputer:
                    NavigateToDecisionPage(_aboutYou);
                    NavigateToDecisionPage(_accessToRoom);
                    NavigateToDecisionPage(_aboutYourClient);
                    NavigateToDecisionPage(_clientAttendance);
                    NavigateToDecisionPage(_hearingSuitability);
                    _currentPage = _yourComputer;
                    break;
                case RepresentativePageNames.AboutYourComputer:
                    NavigateToDecisionPage(_aboutYou);
                    NavigateToDecisionPage(_accessToRoom);
                    NavigateToDecisionPage(_aboutYourClient);
                    NavigateToDecisionPage(_clientAttendance);
                    NavigateToDecisionPage(_hearingSuitability);
                    NavigateToDecisionPage(_yourComputer);
                    _currentPage = _aboutYourComputer;
                    break;
                case SelfTestPageNames.CheckYourComputer:
                    NavigateToDecisionPage(_aboutYou);
                    NavigateToDecisionPage(_accessToRoom);
                    NavigateToDecisionPage(_aboutYourClient);
                    NavigateToDecisionPage(_clientAttendance);
                    NavigateToDecisionPage(_hearingSuitability);
                    NavigateToDecisionPage(_yourComputer);
                    NavigateToDecisionPage(_aboutYourComputer);
                    _questionnaireCompleted.Continue();
                    _currentPage = _checkYourComputer;
                    break;
                case SelfTestPageNames.SwitchOnCameraAndMicrophone:
                    NavigateToDecisionPage(_aboutYou);
                    NavigateToDecisionPage(_accessToRoom);
                    NavigateToDecisionPage(_aboutYourClient);
                    NavigateToDecisionPage(_clientAttendance);
                    NavigateToDecisionPage(_hearingSuitability);
                    NavigateToDecisionPage(_yourComputer);
                    NavigateToDecisionPage(_aboutYourComputer);
                    _questionnaireCompleted.Continue();
                    NavigateToDecisionPage(_checkYourComputer);
                   _currentPage = _switchOnCameraAndMicrophone;
                    break;
            }
            _scenarioContext.Set<DecisionJourney>(_currentPage, "CurrentPage");
        }

        [Then(@"Representative should be on '(.*)' screen")]
        public void ThenParticipantShouldProceedToPage(string page)
        {
            var pageToValidate = GetPage(page);
            pageToValidate.Validate();
            if(page == RepresentativePageNames.AboutYourComputer 
                || page == RepresentativePageNames.QuestionnaireCompleted 
                || page == SelfTestPageNames.CheckYourComputer
                || page == SelfTestPageNames.SwitchOnCameraAndMicrophone
                || page == SelfTestPageNames.TestYourEquipment)
            {
                _scenarioContext.Set<DecisionJourney>((DecisionJourney)pageToValidate, "CurrentPage");
            }
        }

        [Given(@"Representative participant starts the questionnaire")]
        public void GivenRepresentativeParticipantStartsTheQuestionnaire()
        {
            _information.InformationScreen("Representative");
        }

        [When(@"provides answer")]
        public void WhenProvidesAnswer(Table table)
        {
            var reponses = table.CreateSet<SuitabilityResponse>();
            foreach (var response in reponses)
            {
               var currentPage = (DecisionJourney)GetPage(response.Page);
                SelectAnswer(currentPage, response.Answer);
                if(!string.IsNullOrEmpty(response.Details?.Trim()))
                {
                    currentPage.SelectYes(response.Details.Trim());
                }
                response.QuestionKey = currentPage.QuestionKey;
                currentPage.Continue();
            }
            _scenarioContext.Set(reponses, "Responses");
        }

        [Then(@"all the answers should match")]
        public void ThenAllTheAnswersShouldBeMatch()
        {
            var reponses = _scenarioContext.Get<IEnumerable<SuitabilityResponse>>("Responses");

            foreach (var expectedResponse in reponses)
            {
                var displayedAnswer = GetMethods.GetText(By.CssSelector($"#{expectedResponse.QuestionKey} strong"), _browserContext);
                if(expectedResponse.Answer == AnswerType.NotSure)
                {
                    displayedAnswer.Should().Be("I'm not sure");
                }
                else
                {
                    displayedAnswer.Should().Be(expectedResponse.Answer.ToString());
                }
                
                if(!string.IsNullOrEmpty(expectedResponse.Details?.Trim()))
                {
                    var displayedNotes = GetMethods.GetText(By.CssSelector($"#{expectedResponse.QuestionKey}_Notes span"), _browserContext);
                    displayedNotes.Should().Be(expectedResponse.Details.ToString());
                }
            }

            //Verify the expected data by comparing them against database
            var request = _testContext.Get($"persons/username/{_testContext.TestUserSecrets.Representative}/suitability-answers");
            var response = _testContext.Client().Execute(request);
            var model = ApiRequestHelper.DeserialiseSnakeCaseJsonToResponse<List<PersonSuitabilityAnswerResponse>>(response.Content);
            var answers = model.First(h => h.Hearing_id.ToString() == _testContext.HearingId).Answers;
            foreach (var expectedResponse in reponses)
            {
                var answer = answers.Single(a => a.Key == expectedResponse.QuestionKey);
                switch (expectedResponse.Answer)
                {
                    case AnswerType.Yes:
                        answer.Answer.Should().Be(answer.Key == RepresentativeQuestionKeys.AboutYourComputer ? "Yes" : "true");
                        break;
                    case AnswerType.No:
                        answer.Answer.Should().Be(answer.Key == RepresentativeQuestionKeys.AboutYourComputer ? "Yes" : "false");
                        break;
                    case AnswerType.NotSure:
                        answer.Answer.Should().Be("Not sure");
                        break;
                }
                if (!string.IsNullOrEmpty(expectedResponse.Details?.Trim()))
                {
                    answer.Extended_answer.Should().Be(expectedResponse.Details.Trim().ToString());
                }
            }

        }

        [Then(@"a link with text '(.*)' to print the answers should be visible")]
        public void ThenNeedToBeAbleToPrintTheAnswer(string linkText)
        {
            var printLink = _browserContext.NgDriver.FindElement(By.Id("print_questionnaire"));
            printLink.Displayed.Should().BeTrue();
            printLink.Text.Trim().Should().Be(linkText);
        }

        [Given(@"Representative participant has already submitted questionnaire but not completed self-test")]
        public void GivenRepresentativeParticipantHasAlreadySubmittedQuestionnaireButNotCompletedSelf_Test()
        {
            SubmitQuestionnaireForPositivePath();
        }

        [Given(@"Representative participant has already submitted questionnaire but drops out")]
        public void GivenRepresentativeParticipantHasAlreadySubmittedQuestionnaireButDropsOut()
        {
            //Submit the answers for individual
            var answerRequestBody = new List<SuitabilityAnswersRequest>();
            answerRequestBody.Add(CreateSuitabilityAnswersRequest("ABOUT_YOU", "false", null));
            answerRequestBody.Add(CreateSuitabilityAnswersRequest("ABOUT_YOUR_CLIENT", "false", null));
            answerRequestBody.Add(CreateSuitabilityAnswersRequest("CLIENT_ATTENDANCE", "true", null));
            answerRequestBody.Add(CreateSuitabilityAnswersRequest("HEARING_SUITABILITY", "false", null));
            answerRequestBody.Add(CreateSuitabilityAnswersRequest("ROOM", "true", null));
            answerRequestBody.Add(CreateSuitabilityAnswersRequest("COMPUTER", "false", null));

            SubmitSuitabilityAnswers(_representativeParticipantId, answerRequestBody);
        }
        protected override bool ShouldSelectYes(DecisionJourney decisionJourneyPage)
        {
            return (decisionJourneyPage == _yourComputer ||
                   decisionJourneyPage == _aboutYourComputer ||
                   decisionJourneyPage == _accessToRoom || 
                   decisionJourneyPage == _checkYourComputer);
        }

        private Page GetPage(string page)
        {
            switch (page)
            {
                case RepresentativePageNames.AboutYou:
                    return _aboutYou;
                case RepresentativePageNames.AboutYourClient:
                    return _aboutYourClient;
                case RepresentativePageNames.AccessToRoom:
                    return _accessToRoom;
                case RepresentativePageNames.ClientAttendance:
                    return _clientAttendance;
                case RepresentativePageNames.HearingSuitability:
                    return _hearingSuitability;
                case RepresentativePageNames.YourComputer:
                    return _yourComputer;
                case RepresentativePageNames.AboutYourComputer:
                    return _aboutYourComputer;
                case RepresentativePageNames.QuestionnaireCompleted:
                    return _questionnaireCompleted;
                case RepresentativePageNames.PleaseContactUs:
                    return _pleaseContactUs;
                case RepresentativePageNames.ThankYou:
                    return _thankYou;
                case SelfTestPageNames.CheckYourComputer:
                    return _checkYourComputer;
                case SelfTestPageNames.SwitchOnCameraAndMicrophone:
                    return _switchOnCameraAndMicrophone;
                case SelfTestPageNames.TestYourEquipment:
                    return _testYourEquipment;
                case SelfTestPageNames.CameraWorking:
                    return _cameraWorking;
                case SelfTestPageNames.MicrophoneWorking:
                    return _microphoneWorking;
                case SelfTestPageNames.VideoWorking:
                    return _videoWorking;
                case SelfTestPageNames.SignBackIn:
                    return _signBackIn;
                case SelfTestPageNames.SignInOncomputer:
                    return _signInOnComputer;
                case SelfTestPageNames.EquipmentBlocked:
                    return _equipmentBlocked;
            }
            throw new Exception("Invalid page");
        }

        private void SubmitQuestionnaireForPositivePath()
        {
            //Submit the answers for individual
            var answerRequestBody = new List<SuitabilityAnswersRequest>();
            answerRequestBody.Add(CreateSuitabilityAnswersRequest("ABOUT_YOU", "true", "I am partially deaf"));
            answerRequestBody.Add(CreateSuitabilityAnswersRequest("ABOUT_YOUR_CLIENT", "true", "mobility issues"));
            answerRequestBody.Add(CreateSuitabilityAnswersRequest("CLIENT_ATTENDANCE", "true", null));
            answerRequestBody.Add(CreateSuitabilityAnswersRequest("HEARING_SUITABILITY", "true", "insufficient documents"));
            answerRequestBody.Add(CreateSuitabilityAnswersRequest("ROOM", "true", null));
            answerRequestBody.Add(CreateSuitabilityAnswersRequest("COMPUTER", "true", null));
            answerRequestBody.Add(CreateSuitabilityAnswersRequest("CAMERA_MICROPHONE", "Yes", null));

            SubmitSuitabilityAnswers(_representativeParticipantId, answerRequestBody);
        }
    }
}