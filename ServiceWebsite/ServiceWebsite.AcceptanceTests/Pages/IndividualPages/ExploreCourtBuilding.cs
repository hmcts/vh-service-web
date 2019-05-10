using ServiceWebsite.AcceptanceTests.Helpers;

namespace ServiceWebsite.AcceptanceTests.Pages.IndividualPages
{
    public class ExploreCourtBuilding : JourneyStepPage
    {
        public ExploreCourtBuilding(BrowserContext browserContext) : base(browserContext)
        {

        }
        protected override string UrlToValidate => PageUri.ExploreCourtBuildingPage;
    }
}