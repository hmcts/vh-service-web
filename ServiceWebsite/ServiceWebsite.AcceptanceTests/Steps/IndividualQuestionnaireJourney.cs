using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Pages;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public sealed class IndividualQuestionnaireJourney
    {
        private readonly DecisionJourney _aboutYou;
        private readonly ErrorMessage _errorMessage;
        private readonly LoginSteps _loginSteps;
        private DecisionJourney _currentPage;
        private readonly DecisionJourney _interpreter;
        public IndividualQuestionnaireJourney(BrowserContext browserContext, ErrorMessage errorMessage, LoginSteps loginSteps)
        {
            _aboutYou = new DecisionJourney(browserContext, PageUri.AboutYouPage);
            _interpreter = new DecisionJourney(browserContext, PageUri.InterpreterPage);
            _errorMessage = errorMessage;
            _loginSteps = loginSteps;

        }
        [Given(@"'(.*)' participant is on '(.*)' page")]
        public void GivenIndividualParticipantIsOnPage(string participant, string page)
        {
            _loginSteps.WhenIndividualLogsInWithValidCredentials(participant);
            switch (page)
            {
                case "about you": _aboutYou.Navigate();
                    _currentPage = _aboutYou;
                    break;
                case "interpreter":
                    NavigateToDecisionPage(_aboutYou);
                     _currentPage = _interpreter;
                    break;
            }            
        }

        [When(@"Individual attempts to proceed without selecting an answer")]
        public void WhenIndividualAttemptsToProceedWithoutSelectingAnAnswer()
        {
            _currentPage.Continue();
        }

        [Then(@"(.*) error should be displayed")]
        [Then(@"(.*) errors should be displayed")]
        public void ThenAnErrorMessageShouldBeDisplayed(int errorCounter)
        {
            _errorMessage.ValidateErrorMessage(errorCounter);
        }

        [Then(@"Participant should proceed to about you page")]
        public void ThenParticipantShouldProceedToAboutYouPage()
        {
            _aboutYou.Validate();
        }

        [When(@"Individual provides answer as yes")]
        public void WhenIndividualProvidesAnswerAsYes()
        {
            _currentPage.SelectYes();
        }

        [When(@"Individual proceeds to next page")]
        [When(@"Individual attempts to proceed without providing additional information")]
        public void WhenIndividualAttemptsToProceedWithoutProvidingAdditionalInformation()
        {
            _currentPage.Continue();
        }

        [When(@"Individual provides additional information '(.*)'")]
        [When(@"Individual provides additional information containing a two character length '(.*)'")]
        public void WhenIndividualProvidesAdditionalInformationContainingLessThanCharacters(string detail)
        {
            _aboutYou.SelectYes(detail);
        }

        [When(@"Individual provides answer as no")]
        public void WhenIndividualProvidesAnswerAsNo()
        {
            _currentPage.SelectNo();
        }
        [Then(@"Individual should be on '(.*)' screen")]
        public void ThenParticipantShouldProceedToPage(string page)
        {
            switch (page)
            {
                case "about you": _aboutYou.Validate();
                    break;
                case "interpreter" : _interpreter.Validate();
                    break;
            }
        }
        private void NavigateToDecisionPage(DecisionJourney decisionJourneyPage)
        {
            decisionJourneyPage.Navigate();
            decisionJourneyPage.SelectNo();
            decisionJourneyPage.Continue();
        }
    }
}