using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Navigation;
using ServiceWebsite.AcceptanceTests.Pages;
using System;
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

        public IndividualQuestionnaireSteps(BrowserContext browserContext, InformationSteps information, ScenarioContext scenarioContext) : base(browserContext, information, scenarioContext)
        {
            _aboutYou = new DecisionJourney(browserContext, PageUri.AboutYouPage);
            _interpreter = new DecisionJourney(browserContext, PageUri.InterpreterPage);
            _yourComputer = new DecisionJourney(browserContext, PageUri.YourComputerPage);
            _aboutYourComputer = new DecisionJourney(browserContext, PageUri.AboutYourComputerPage);
            _information = information;
            _yourInternetConnection = new DecisionJourney(browserContext, PageUri.YourInternetConnectionPage);
            _accessToRoom = new DecisionJourney(browserContext, PageUri.AccessToARoomPage);
            _consent = new DecisionJourney(browserContext, PageUri.ConsentPage);
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
                case "about you":
                    _aboutYou.Validate();
                    break;
                case "interpreter":
                    _interpreter.Validate();
                    break;
                case "your computer":
                    _yourComputer.Validate();
                    break;
                case "thank you":
                    _thankYou.Validate();
                    break;
                case "about your computer":
                    _aboutYourComputer.Validate();
                    break;
                case "your internet connection":
                    _yourInternetConnection.Validate();
                    break;
                case "access to a room":
                    _accessToRoom.Validate();
                    break;
                case "consent":
                    _consent.Validate();
                    break;
            }
        }

        [When(@"Individual provides additional information for not consenting to video hearing as '(.*)'")]
        public void WhenIndividualProvidesAdditionalInformationForNotConsentingToVideoHearingAs(string detail)
        {
            _aboutYou.SelectNo(detail);
        }

        protected override bool ShouldSelectYes(DecisionJourney decisionJourneyPage)
        {
            return (decisionJourneyPage == _yourComputer || 
                    decisionJourneyPage == _aboutYourComputer || 
                    decisionJourneyPage == _yourInternetConnection);
        }
    }
}