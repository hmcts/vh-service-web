using ServiceWebsite.AcceptanceTests.Helpers;

namespace ServiceWebsite.AcceptanceTests.Pages.IndividualPages
{
    public class CourtBuildingVideo : CommonPage
    {
        public CourtBuildingVideo(BrowserContext browserContext) : base(browserContext)
        {

        }
        protected override string UrlToValidate => PageUri.CourtBuildingVideoPage;
    }
}
