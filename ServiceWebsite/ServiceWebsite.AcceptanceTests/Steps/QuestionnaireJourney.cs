﻿using ServiceWebsite.AcceptanceTests.Navigation;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Pages;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public class QuestionnaireJourney
    {
        private readonly InformationSteps _information;
        protected readonly Page _thankYou;
        private ErrorMessage _errorMessage;
        public readonly ScenarioContext _scenarioContext;

        public QuestionnaireJourney(BrowserContext browserContext, InformationSteps information, ScenarioContext scenarioContext)
        {
            _information = information;
            _errorMessage = new ErrorMessage(browserContext);
            _thankYou = new Page(browserContext, PageUri.ThankYouPage);
            _scenarioContext = scenarioContext;
        }
        

        [Then(@"(.*) error should be displayed")]
        [Then(@"(.*) errors should be displayed")]
        private void ThenAnErrorMessageShouldBeDisplayed(int errorCounter)
        {
            _errorMessage.ValidateErrorMessage(errorCounter);
        }

        [When(@"Individual provides answer as (.*)")]
        [When(@"provides answer as (.*)")]
        private void WhenIndividualProvidesAnswerAsNotsure(AnswerType answer)
        {
            switch (answer)
            {
                case AnswerType.Yes: CurrentPage.SelectYes();
                    break;
                case AnswerType.No: CurrentPage.SelectNo();
                    break;
                case AnswerType.NotSure: CurrentPage.SelectNotSure();
                    break;
            }
        }

        [When(@"Participant attempts to proceed without selecting an answer")]
        [When(@"Individual attempts to proceed without selecting an answer")]
        [When(@"Individual proceeds to next page")]
        [When(@"Individual attempts to proceed without providing additional information")]
        [When(@"proceeds to next page")]
        private void WhenIndividualAttemptsToProceedWithoutProvidingAdditionalInformation()
        {
            CurrentPage.Continue();
        }

        [When(@"Individual provides additional information '(.*)'")]
        [When(@"Individual provides additional information containing a two character length '(.*)'")]
        private void WhenIndividualProvidesAdditionalInformationContainingLessThanCharacters(string detail)
        {
            CurrentPage.SelectYes(detail);
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

        private DecisionJourney CurrentPage
        {
            get
            {
                return _scenarioContext.Get<DecisionJourney>("CurrentPage");
            }
        }
    }
}