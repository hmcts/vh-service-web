﻿using ServiceWebsite.AcceptanceTests.Navigation;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Pages;
using TechTalk.SpecFlow;
using ServiceWebsite.BookingsAPI.Client;
using ServiceWebsite.AcceptanceTests.Contexts;
using RestSharp;
using System.Collections.Generic;
using OpenQA.Selenium;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public class QuestionnaireJourney
    {
        private readonly InformationSteps _information;
        protected readonly Page _thankYou;
        private readonly DecisionJourney _checkYourComputer;
        private ErrorMessage _errorMessage;
        public readonly ScenarioContext _scenarioContext;
        private readonly TestContext _testContext;
        private readonly BrowserContext _browserContext;

        public QuestionnaireJourney(TestContext testContext, BrowserContext browserContext, InformationSteps information, ScenarioContext scenarioContext)
        {
            _information = information;
            _errorMessage = new ErrorMessage(browserContext);
            _thankYou = new Page(browserContext, PageUri.ThankYouPage);
            _checkYourComputer = new DecisionJourney(browserContext, PageUri.CheckYourComputer);
            _scenarioContext = scenarioContext;
            _testContext = testContext;
            _browserContext = browserContext;
        }
        

        [Then(@"(.*) error should be displayed")]
        [Then(@"(.*) errors should be displayed")]
        private void ThenAnErrorMessageShouldBeDisplayed(int errorCounter)
        {
            _errorMessage.ValidateErrorMessage(errorCounter);
        }

        [When(@"provides answer as (.*)")]
        private void WhenIndividualProvidesAnswerAsNotsure(AnswerType answer)
        {
            SelectAnswer((DecisionJourney)CurrentPage, answer);
        }

        [When(@"attempts to proceed without selecting an answer")]
        [When(@"attempts to proceed without providing additional information")]
        [When(@"proceeds to next page")]
        private void WhenIndividualAttemptsToProceedWithoutProvidingAdditionalInformation()
        {
            CurrentPage.Continue();
        }

        [When(@"provides additional information '(.*)'")]
        [When(@"provides additional information containing a two character length '(.*)'")]
        private void WhenIndividualProvidesAdditionalInformationContainingLessThanThreeCharacters(string detail)
        {
            ((DecisionJourney)CurrentPage).SelectYes(detail);
        }

        [When(@"provides additional information containing a two character length '(.*)' for No answer")]
        private void WhenIndividualProvidesAdditionalInformationContainingLessThanThreeCharactersForNoAnswer(string detail)
        {
            ((DecisionJourney)CurrentPage).SelectNo(detail);
        }

        [When(@"clicks Check My Equipment button")]
        private void WhenClicksCheckMyEquipmentButton()
        {
            _browserContext.NgDriver.WaitUntilElementVisible(By.Id("checkYourEquipment")).Click();
        }

        protected void NavigateToDecisionPage(DecisionJourney decisionJourneyPage)
        {
            decisionJourneyPage.Validate();
            if (ShouldSelectYes(decisionJourneyPage))
            {                
                decisionJourneyPage.SelectYes();
            }
            else
            {
                decisionJourneyPage.SelectNo();
            }            
            decisionJourneyPage.Continue();
        }

        protected virtual bool ShouldSelectYes(DecisionJourney decisionJourneyPage)
        {
            return true;
        }

        private JourneyStepPage CurrentPage
        {
            get
            {
                return _scenarioContext.Get<JourneyStepPage>("CurrentPage");
            }
        }

        protected void SelectAnswer(DecisionJourney page, AnswerType answer)
        {
            switch (answer)
            {
                case AnswerType.Yes:
                    page.SelectYes();
                    break;
                case AnswerType.No:
                    page.SelectNo();
                    break;
                case AnswerType.NotSure:
                    page.SelectNotSure();
                    break;
            }
        }

        protected SuitabilityAnswersRequest CreateSuitabilityAnswersRequest(string key, string answer, string extendedAnswer)
        {
            return new SuitabilityAnswersRequest
            {
                Key = key,
                Answer = answer,
                Extended_answer = extendedAnswer
            };
        }

        protected void SubmitSuitabilityAnswers(string participantId, List<SuitabilityAnswersRequest> answerRequestBody)
        {
            var requestUrl = $"/hearings/{_testContext.HearingId}/participants/{participantId}/suitability-answers";
            var answerRequest = _testContext.Put(requestUrl, answerRequestBody);
            var response = _testContext.Client().Execute(answerRequest);
        }
    }
}