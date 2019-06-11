using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Navigation;
using ServiceWebsite.AcceptanceTests.Pages;
using TechTalk.SpecFlow;

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
        private readonly DecisionJourney _thankYou;
        
        public RepresentativeQuestionnaireSteps(BrowserContext browserContext, ErrorMessage errorMessage, InformationSteps information, ScenarioContext scenarioContext) : base(browserContext, information, scenarioContext)
        {
            _information = information;
            _aboutVideoHearings = new DecisionJourney(browserContext, RepresentativePageUrl.AboutVideoHearings);
            _aboutYouAndYouClient = new DecisionJourney(browserContext, RepresentativePageUrl.AboutYouAndYourClient);
            _aboutYou = new DecisionJourney(browserContext, RepresentativePageUrl.AboutYou);
            _accessToRoom = new DecisionJourney(browserContext, RepresentativePageUrl.AccessToRoom);
            _aboutYourClient = new DecisionJourney(browserContext, RepresentativePageUrl.AboutYourClient);
            _clientAttendance = new DecisionJourney(browserContext, RepresentativePageUrl.ClientAttendance);
            _hearingSuitability = new DecisionJourney(browserContext, RepresentativePageUrl.HearingSuitability);
            _yourComputer = new DecisionJourney(browserContext, RepresentativePageUrl.YourComputerRep);
            _aboutYourComputer = new DecisionJourney(browserContext, RepresentativePageUrl.AboutYourComputerRep);
            _questionnaireCompleted = new DecisionJourney(browserContext, RepresentativePageUrl.QuestionnaireCompleted);
            _thankYou = new DecisionJourney(browserContext, RepresentativePageUrl.ThankYouRep);
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
                case "about you":
                    _aboutYou.Validate();
                    _currentPage = _aboutYou;
                    break;
                case "access to a room rep":
                    NavigateToDecisionPage(_aboutYou);
                    _currentPage = _accessToRoom;
                    break;
                case "your computer":
                    NavigateToDecisionPage(_aboutYou);
                    NavigateToDecisionPage(_accessToRoom);
                    NavigateToDecisionPage(_aboutYourClient);
                    NavigateToDecisionPage(_clientAttendance);
                    _hearingSuitability.Continue();
                    _currentPage = _yourComputer;
                    break;
                case "about your computer":
                    NavigateToDecisionPage(_aboutYou);
                    NavigateToDecisionPage(_accessToRoom);
                    NavigateToDecisionPage(_aboutYourClient);
                    NavigateToDecisionPage(_clientAttendance);
                    _hearingSuitability.Continue();
                    NavigateToDecisionPage(_yourComputer);
                    _currentPage = _aboutYourComputer;
                    break;

            }
            _scenarioContext.Set<DecisionJourney>(_currentPage, "CurrentPage");
        }

        [Then(@"Representative should be on '(.*)' screen")]
        public void ThenParticipantShouldProceedToPage(string page)
        {
            switch (page)
            {
                case "about your client":
                    _aboutYourClient.Validate();
                    break;
                case "access to a suitable room":
                    _accessToRoom.Validate();
                    break;
                case "questionnaire completed":
                    _questionnaireCompleted.Validate();
                    break;
            }
        }
        protected override bool ShouldSelectYes(DecisionJourney decisionJourneyPage)
        {
            return (decisionJourneyPage == _yourComputer ||
                   decisionJourneyPage == _aboutYourComputer ||
                   decisionJourneyPage == _accessToRoom);
        }
    }
}