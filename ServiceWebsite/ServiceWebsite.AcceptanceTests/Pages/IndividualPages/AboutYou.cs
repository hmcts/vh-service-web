using ServiceWebsite.AcceptanceTests.Helpers;

namespace ServiceWebsite.AcceptanceTests.Pages.IndividualPages
{
    public class AboutYou : JourneyStepPage
    {
        public AboutYou(BrowserContext browserContext) : base(browserContext)
        {

        }
        protected override string UrlToValidate => PageUri.AboutYouPage;
    }
}
