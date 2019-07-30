using ServiceWebsite.AcceptanceTests.Constants;
using ServiceWebsite.AcceptanceTests.Contexts;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Navigation;
using ServiceWebsite.AcceptanceTests.Pages;
using ServiceWebsite.AcceptanceTests.Pages.SelfTesPages;
using ServiceWebsite.BookingsAPI.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public sealed class IndividualQuestionnaireSteps : QuestionnaireJourney
    {
        private readonly InformationSteps _information;
        private readonly TestContext _testContext;
        private string _individualParticipantId;
        private readonly LoginSteps _loginSteps;
        
        public IndividualQuestionnaireSteps(LoginSteps loginSteps, TestContext testContext, BrowserContext browserContext, InformationSteps information, ScenarioContext scenarioContext) : base(testContext, browserContext, information, scenarioContext)
        {
            _information = information;
            _testContext = testContext;
            _individualParticipantId = _testContext.IndividualParticipantId;
            _loginSteps = loginSteps;
        }

        protected override void InitialisePage(BrowserContext browserContext)
        {
            PageList.Add(new DecisionJourney(browserContext, PageUri.AboutYouPage, IndividualPageNames.AboutYou));
            PageList.Add(new DecisionJourney(browserContext, PageUri.InterpreterPage, IndividualPageNames.Interpreter));
            PageList.Add(new DecisionJourney(browserContext, PageUri.YourComputerPage, IndividualPageNames.YourComputer));
            PageList.Add(new DecisionJourney(browserContext, PageUri.AboutYourComputerPage, IndividualPageNames.AboutYourComputer));
            PageList.Add(new DecisionJourney(browserContext, PageUri.YourInternetConnectionPage, IndividualPageNames.YourInternetConnection));
            PageList.Add(new DecisionJourney(browserContext, PageUri.AccessToARoomPage, IndividualPageNames.AccessToARoom));
            PageList.Add(new DecisionJourney(browserContext, PageUri.ConsentPage, IndividualPageNames.Consent));
        }

        [Given(@"Individual participant is on '(.*)' page")]
        public void GivenIndividualParticipantIsOnPages(string page)
        {
            _information.InformationScreen("Individual");
            InitiateJourneySteps(page);
        }

        [Given(@"Individual participant is on '(.*)' page having submitted questionnaire")]
        public void GivenIndividualParticipantIsOnPageHavingSubmittedQuestionnaire(string page)
        {
            SubmitQuestionnaireForPositivePath();
            _loginSteps.WhenParticipantLogsInWithValidCredentials("Individual");
            NavigateToDecisionPage(GetPage(SelfTestPageNames.CheckYourComputer));
        }
        
        [Then(@"Participant should proceed to about you page")]
        public void ThenParticipantShouldProceedToAboutYouPage()
        {
            GetPage(IndividualPageNames.AboutYou).Validate();
        }

        [Then(@"Individual should be on '(.*)' screen")]
        public void ThenParticipantShouldProceedToPage(string page)
        {
            var currentPage = GetPage(page);
            currentPage.Validate();
            _scenarioContext.Set(currentPage, "CurrentPage");
        }

        [When(@"Individual provides additional information for not consenting to video hearing as '(.*)'")]
        public void WhenIndividualProvidesAdditionalInformationForNotConsentingToVideoHearingAs(string detail)
        {
            var aboutYou = GetPage(IndividualPageNames.AboutYou);
            ((DecisionJourney)aboutYou).SelectNo(detail);
        }

        [Given(@"Individual participant has already submitted questionnaire but not completed self-test")]
        public void GivenIndividualParticipantHasAlreadySubmittedQuestionnaireButNotCompletedSelf_Test()
        {
            SubmitQuestionnaireForPositivePath();
        }

        [Given(@"Individual participant has already submitted questionnaire but drops out")]
        public void GivenIndividualParticipantHasAlreadySubmittedQuestionnaireButDropsOut()
        {
            //Submit the answers for individual
            var answerRequestBody = new List<SuitabilityAnswersRequest>();
            answerRequestBody.Add(CreateSuitabilityAnswersRequest("ABOUT_YOU", "false", null));
            answerRequestBody.Add(CreateSuitabilityAnswersRequest("INTERPRETER", "false", null));
            answerRequestBody.Add(CreateSuitabilityAnswersRequest("COMPUTER", "false", null));
            
            SubmitSuitabilityAnswers(_individualParticipantId, answerRequestBody);
        }

        protected override bool ShouldSelectYes(DecisionJourney decisionJourneyPage)
        {
            return (decisionJourneyPage.Name == IndividualPageNames.YourComputer ||
                    decisionJourneyPage.Name == IndividualPageNames.AboutYourComputer ||
                    decisionJourneyPage.Name == IndividualPageNames.YourInternetConnection ||
                    decisionJourneyPage.Name == IndividualPageNames.Consent ||
                    decisionJourneyPage.Name == SelfTestPageNames.CheckYourComputer);
        }

        private void SubmitQuestionnaireForPositivePath()
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

            SubmitSuitabilityAnswers(_individualParticipantId, answerRequestBody);
        }
    }
}