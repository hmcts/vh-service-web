using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Pages;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public sealed class AboutYouSteps
    {      
        private readonly JourneyStepPage _aboutYou;

        public AboutYouSteps(BrowserContext browserContext)
        {
            _aboutYou = new JourneyStepPage(browserContext, PageUri.AboutYouPage) ;
        }
        
        [Then(@"Participant should proceed to about you page")]
        public void ThenParticipantShouldProceedToAboutYouPage()
        {
            _aboutYou.Validate();
        }
    }
}