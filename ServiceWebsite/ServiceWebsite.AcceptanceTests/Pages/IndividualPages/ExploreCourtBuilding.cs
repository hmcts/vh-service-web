using ServiceWebsite.AcceptanceTests.Helpers;

namespace ServiceWebsite.AcceptanceTests.Pages.IndividualPages
{
    public class ExploreCourtBuilding
    {
        private readonly CommonPages _commonPages;

        public ExploreCourtBuilding(CommonPages commonPages)
        {
            _commonPages = commonPages;
        }

        public void IndividualExploresTheCourtBuilding()
        {
            _commonPages.ValidatePage(PageUri.ExploreCourtBuildingPage);
            _commonPages.Continue();
        }
    }
}