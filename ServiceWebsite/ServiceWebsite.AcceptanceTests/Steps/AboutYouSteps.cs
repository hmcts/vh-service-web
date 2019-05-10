using ServiceWebsite.AcceptanceTests.Pages.IndividualPages;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public sealed class AboutYouSteps
    {      
        private readonly AboutYou _aboutYou;

        public AboutYouSteps(AboutYou aboutYou)
        {
            _aboutYou = aboutYou;
        }
        
        [Then(@"Participant should proceed to about you page")]
        public void ThenParticipantShouldProceedToAboutYouPage()
        {
            _aboutYou.Continue();
        }
    }
}