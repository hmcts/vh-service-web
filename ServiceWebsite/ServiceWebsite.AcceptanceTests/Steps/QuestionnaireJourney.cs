using ServiceWebsite.AcceptanceTests.Navigation;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Pages;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public class QuestionnaireJourney
    {
        public QuestionnaireJourney()
        {

        }
        private readonly DecisionJourney _aboutYou;
        protected ErrorMessage _errorMessage;
        private DecisionJourney _currentPage;
        private readonly DecisionJourney _interpreter;
        private readonly DecisionJourney _yourComputer;
        private readonly Page _thankYou;
        private readonly DecisionJourney _aboutYourComputer;
        private readonly InformationSteps _information;
        private readonly DecisionJourney _yourInternetConnection;
        private readonly DecisionJourney _accessToRoom;
        private readonly DecisionJourney _consent;
        public readonly ScenarioContext _scenarioContext;

        public QuestionnaireJourney(BrowserContext browserContext, InformationSteps information, ScenarioContext scenarioContext)
        {
            _aboutYou = new DecisionJourney(browserContext, PageUri.AboutYouPage);
            _interpreter = new DecisionJourney(browserContext, PageUri.InterpreterPage);
            
            _yourComputer = new DecisionJourney(browserContext, PageUri.YourComputerPage);
            _thankYou = new Page(browserContext, PageUri.ThankYouPage);
            _aboutYourComputer = new DecisionJourney(browserContext, PageUri.AboutYourComputerPage);
            _information = information;
            _yourInternetConnection = new DecisionJourney(browserContext, PageUri.YourInternetConnectionPage);
            _accessToRoom = new DecisionJourney(browserContext, PageUri.AccessToARoomPage);
            _consent = new DecisionJourney(browserContext, PageUri.ConsentPage);
            _scenarioContext = scenarioContext;
        }
        

        [Then(@"(.*) error should be displayed")]
        [Then(@"(.*) errors should be displayed")]
        private void ThenAnErrorMessageShouldBeDisplayed(int errorCounter)
        {
            _errorMessage.ValidateErrorMessage(errorCounter);
        }

        [Then(@"Participant should proceed to about you page")]
        private void ThenParticipantShouldProceedToAboutYouPage()
        {
            _aboutYou.Validate();
        }

        [When(@"Individual provides answer as (.*)")]
        private void WhenIndividualProvidesAnswerAsNotsure(AnswerType answer)
        {
            switch (answer)
            {
                case AnswerType.Yes: _currentPage.SelectYes();
                    break;
                case AnswerType.No: _currentPage.SelectNo();
                    break;
                case AnswerType.NotSure: _currentPage.SelectNotSure();
                    break;
            }
        }

        [When(@"Individual attempts to proceed without selecting an answer")]
        [When(@"Individual proceeds to next page")]
        [When(@"Individual attempts to proceed without providing additional information")]
        private void WhenIndividualAttemptsToProceedWithoutProvidingAdditionalInformation()
        {
            var currentPage = _scenarioContext.Get<DecisionJourney>("CurrentPage");
            currentPage.Continue();
        }

        [When(@"Individual provides additional information '(.*)'")]
        [When(@"Individual provides additional information containing a two character length '(.*)'")]
        private void WhenIndividualProvidesAdditionalInformationContainingLessThanCharacters(string detail)
        {
            var currentPage = _scenarioContext.Get<DecisionJourney>("CurrentPage");
            currentPage.SelectYes(detail);
        }

        [Then(@"Individual should be on '(.*)' screen")]
        private void ThenParticipantShouldProceedToPage(string page)
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
                        _thankYou.Validate();
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
        protected void NavigateToDecisionPage(DecisionJourney decisionJourneyPage)
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
        [When(@"Individual provides additional information for not consenting to video hearing as '(.*)'")]
        private void WhenIndividualProvidesAdditionalInformationForNotConsentingToVideoHearingAs(string detail)
        {
            _aboutYou.SelectYes(detail);
        }

        
    }
}