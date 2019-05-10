using ServiceWebsite.AcceptanceTests.Helpers;

namespace ServiceWebsite.AcceptanceTests.Pages.IndividualPages
{
    public class ExploreVideoHearing : JourneyStepPage
    {
        public ExploreVideoHearing(BrowserContext browserContext) : base(browserContext)
        {

        }
        protected override string UrlToValidate => PageUri.ExploreVideoHearing;
    }
}
