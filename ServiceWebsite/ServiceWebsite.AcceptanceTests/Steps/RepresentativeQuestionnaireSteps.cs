using FluentAssertions;
using OpenQA.Selenium;
using ServiceWebsite.AcceptanceTests.Constants;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Navigation;
using ServiceWebsite.AcceptanceTests.Pages;
using System;
using System.Collections.Generic;
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
        private readonly DecisionJourney _sameComputer;
        private readonly DecisionJourney _useCameraAndMicrophone;
        private readonly Page _selfTest;
        private readonly DecisionJourney _cameraWorking;
        private readonly DecisionJourney _microphoneWorking;
        private readonly Page _seeAndHearVideo;
        private string _key = string.Empty;
        private readonly BrowserContext _browserContext;

        public RepresentativeQuestionnaireSteps(BrowserContext browserContext, ErrorMessage errorMessage, InformationSteps information, ScenarioContext scenarioContext) : base(browserContext, information, scenarioContext)
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
            _sameComputer = new DecisionJourney(browserContext, PageUri.SameComputer);
            _useCameraAndMicrophone = new DecisionJourney(browserContext, PageUri.UseCameraAndMicrophone);
            _selfTest = new Page(browserContext, PageUri.SelfTest);
            _cameraWorking = new DecisionJourney(browserContext, PageUri.CameraWorking);
            _microphoneWorking = new DecisionJourney(browserContext, PageUri.MicrophoneWorking);
            _seeAndHearVideo = new Page(browserContext, PageUri.SeeAndHearVideo);
        }
        
        [Given(@"Representative participant is on '(.*)' page")]
        public void GivenRepresentativeParticipantIsOnPage(string page)
        {
            _information.InformationScreen("Representative");
            InitiateJourneySteps(page);
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
            }
            _scenarioContext.Set<DecisionJourney>(_currentPage, "CurrentPage");
        }

        [Then(@"Representative should be on '(.*)' screen")]
        public void ThenParticipantShouldProceedToPage(string page)
        {
            var pageToValidate = GetPage(page);
            pageToValidate.Validate();
            if(page == "about your computer" || page == "questionnaire completed")
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
        }

        [Then(@"a link with text '(.*)' to print the answers should be visible")]
        public void ThenNeedToBeAbleToPrintTheAnswer(string linkText)
        {
            var printLink = _browserContext.NgDriver.FindElement(By.Id("print_questionnaire"));
            printLink.Displayed.Should().BeTrue();
            printLink.Text.Trim().Should().Be(linkText);
        }


        protected override bool ShouldSelectYes(DecisionJourney decisionJourneyPage)
        {
            return (decisionJourneyPage == _yourComputer ||
                   decisionJourneyPage == _aboutYourComputer ||
                   decisionJourneyPage == _accessToRoom);
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
                case SelfTestPageNames.SameComputer:
                    return _sameComputer;
                case SelfTestPageNames.UseCameraAndMicrophone:
                    return _useCameraAndMicrophone;
                case SelfTestPageNames.SelfTest:
                    return _selfTest;
                case SelfTestPageNames.CameraWorking:
                    return _cameraWorking;
                case SelfTestPageNames.MicrophoneWorking:
                    return _microphoneWorking;
                case SelfTestPageNames.SeeAndHearVideo:
                    return _seeAndHearVideo;
            }
            throw new Exception("Invalid page");
        }
    }
}