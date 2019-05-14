using FluentAssertions;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Pages.IndividualPages;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public sealed class ContactUsSteps
    {
        private readonly ContactUs _contactUs;
        public ContactUsSteps(BrowserContext browserContext)
        {
            _contactUs = new ContactUs(browserContext, PageUri.AboutHearingsPage);
        }
        
        [When(@"Individual is on any of the service web page")]
        public void WhenIndividualIsOnAnyOfTheWebPage()
        {
            _contactUs.Validate();
        }

        [Then(@"Individual should be able to view contact details")]
        public void ThenIndividualShouldBeAbleToViewContactDetails()
        {
            _contactUs.ContactUsForHelp().Should().BeTrue("Contact detail section is missing");
        }
    }
}