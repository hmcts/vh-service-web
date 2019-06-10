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

        public RepresentativeQuestionnaireSteps(BrowserContext browserContext, ErrorMessage errorMessage, InformationSteps information, ScenarioContext scenarioContext) : base(browserContext, information, scenarioContext)
        {
            _information = information;
            _aboutVideoHearings = new DecisionJourney(browserContext, RepresentativePageUrl.AboutVideoHearings);
            _aboutYouAndYouClient = new DecisionJourney(browserContext, RepresentativePageUrl.AboutYouAndYourClient);
            _aboutYou = new DecisionJourney(browserContext, RepresentativePageUrl.AboutYou);
            _accessToRoom = new DecisionJourney(browserContext, RepresentativePageUrl.AccessToRoom);
            _aboutYourClient = new DecisionJourney(browserContext, RepresentativePageUrl.AboutYourClient);
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
                case "about video hearings":
                    _aboutVideoHearings.Validate();
                    _currentPage = _aboutVideoHearings;
                    break;
                case "access to a room rep":
                    _aboutYou.Continue();
                    _currentPage = _accessToRoom;
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
            }
        }
    }
}