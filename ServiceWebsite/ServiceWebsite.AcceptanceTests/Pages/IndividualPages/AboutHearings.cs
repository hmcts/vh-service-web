using ServiceWebsite.AcceptanceTests.Helpers;

namespace ServiceWebsite.AcceptanceTests.Pages.IndividualPages
{
   public class AboutHearings : JourneyStepPage
    {
        public AboutHearings(BrowserContext browserContext) : base(browserContext)
        {

        }
        protected override string UrlToValidate => PageUri.AboutHearingsPage;
   }
}