using ServiceWebsite.AcceptanceTests.Helpers;

namespace ServiceWebsite.AcceptanceTests.Pages.IndividualPages
{
    public class CourtBuildingVideo
    {
        private readonly CommonPages _commonPages;

        public CourtBuildingVideo(CommonPages commonPages)
        {
            _commonPages = commonPages;
        }

        public void IndividualViewsTheCourtBuildingVideo()
        {
            _commonPages.ValidatePage(PageUri.CourtBuildingVideoPage);
            _commonPages.Continue();
        }
    }
}
