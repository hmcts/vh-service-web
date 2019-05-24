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
        private DecisionJourney _currentPage;
        private readonly DecisionJourney _interpreter;
        private readonly DecisionJourney _yourComputer;
        private readonly Page _thankYou;
        private readonly DecisionJourney _aboutYourComputer;
        private readonly InformationSteps _information;
        private bool Answer;
        private readonly DecisionJourney _yourInternetConnection;
        private readonly DecisionJourney _accessToRoom;
        private readonly DecisionJourney _consent;
        public IndividualQuestionnaireJourney(BrowserContext browserContext, ErrorMessage errorMessage, InformationSteps information)
        {
            _aboutYou = new DecisionJourney(browserContext, PageUri.AboutYouPage);
            _interpreter = new DecisionJourney(browserContext, PageUri.InterpreterPage);
            _errorMessage = errorMessage;
            _yourComputer = new DecisionJourney(browserContext, PageUri.YourComputerPage);
            _thankYou = new Page(browserContext, PageUri.ThankYouPage);
            _aboutYourComputer = new DecisionJourney(browserContext, PageUri.AboutYourComputerPage);
            _information = information;
            _yourInternetConnection = new DecisionJourney(browserContext, PageUri.YourInternetConnectionPage);
            _accessToRoom = new DecisionJourney(browserContext, PageUri.AccessToARoomPage);
            _consent = new DecisionJourney(browserContext, PageUri.ConsentPage);
        }
        [Given(@"'(.*)' participant is on '(.*)' page")]
        public void GivenIndividualParticipantIsOnPage(string participant, string page)
        {
            _information.InformationScreen(participant);
            switch (page)
            {
                case "about you":
                    _aboutYou.Validate();
                    _currentPage = _aboutYou;
                    break;
                case "interpreter":
                    NavigateToDecisionPage(_aboutYou);
                    _currentPage = _interpreter;
                    break;
                case "your computer":
                    NavigateToDecisionPage(_aboutYou);
                    NavigateToDecisionPage(_interpreter);
                    _currentPage = _yourComputer;
                    break;
                case "about your computer":
                    NavigateToDecisionPage(_aboutYou);
                    NavigateToDecisionPage(_interpreter);
                    NavigateToDecisionPage(_yourComputer);
                    _currentPage = _aboutYourComputer;
                    break;
                case "your internet connection":
                    NavigateToDecisionPage(_aboutYou);
                    NavigateToDecisionPage(_interpreter);
                    NavigateToDecisionPage(_yourComputer);
                    NavigateToDecisionPage(_aboutYourComputer);
                    _currentPage = _yourInternetConnection;
                    break;
                case "access to a room":
                    NavigateToDecisionPage(_aboutYou);
                    NavigateToDecisionPage(_interpreter);
                    NavigateToDecisionPage(_yourComputer);
                    NavigateToDecisionPage(_aboutYourComputer);
                    NavigateToDecisionPage(_yourInternetConnection);
                    _currentPage = _accessToRoom;
                    break;
                case "consent":
                    NavigateToDecisionPage(_aboutYou);
                    NavigateToDecisionPage(_interpreter);
                    NavigateToDecisionPage(_yourComputer);
                    NavigateToDecisionPage(_aboutYourComputer);
                    NavigateToDecisionPage(_yourInternetConnection);
                    NavigateToDecisionPage(_accessToRoom);
                    _currentPage = _consent;
                    break;
            }
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

        [When(@"Individual provides answer as (.*)")]
        public void WhenIndividualProvidesAnswerAsNotsure(AnswerType answer)
        {
            switch (answer)
            {
                case AnswerType.Yes: _currentPage.SelectYes();
                    break;
                case AnswerType.No:
                    _currentPage.SelectNo();
                    Answer = false;
                    break;
                case AnswerType.NotSure: _currentPage.SelectNotSure();
                    break;
            }
        }

        [When(@"Individual attempts to proceed without selecting an answer")]
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

        [Then(@"Individual should be on '(.*)' screen")]
        public void ThenParticipantShouldProceedToPage(string page)
        {
            switch (page)
            {
                case "about you": _aboutYou.Validate();
                    break;
                case "interpreter": _interpreter.Validate();
                    break;
                case "your computer": _yourComputer.Validate();
                    break;
                case "thank you":
                    if (!Answer)
                    {
                        _thankYou.Validate();
                    }
                    break;
                case "about your computer": _aboutYourComputer.Validate();
                    break;
                case "your internet connection": _yourInternetConnection.Validate();
                    break;
                case "access to a room": _accessToRoom.Validate();
                    break;
                case "consent": _consent.Validate();
                    break;
            }
        }
        private void NavigateToDecisionPage(DecisionJourney decisionJourneyPage)
        {
            decisionJourneyPage.Validate();
            if (decisionJourneyPage == _yourComputer || decisionJourneyPage == _aboutYourComputer || decisionJourneyPage == _yourInternetConnection)
            {                
                decisionJourneyPage.SelectYes();
            }
            else
            {
                decisionJourneyPage.SelectNo();
            }            
            decisionJourneyPage.Continue();
        }
    }
}