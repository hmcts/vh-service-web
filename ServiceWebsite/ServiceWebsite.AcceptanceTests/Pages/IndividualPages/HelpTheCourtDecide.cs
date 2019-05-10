using ServiceWebsite.AcceptanceTests.Helpers;

namespace ServiceWebsite.AcceptanceTests.Pages.IndividualPages
{
    public class HelpTheCourtDecide : JourneyStepPage
    {
        public HelpTheCourtDecide(BrowserContext browserContext) : base(browserContext)
        {

        }
        protected override string UrlToValidate => PageUri.HelpTheCourtDecidePage;
    }
}