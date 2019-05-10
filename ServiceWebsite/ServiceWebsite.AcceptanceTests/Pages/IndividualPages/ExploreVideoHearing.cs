using ServiceWebsite.AcceptanceTests.Helpers;

namespace ServiceWebsite.AcceptanceTests.Pages.IndividualPages
{
    public class ExploreVideoHearing
    {
        private readonly CommonPages _commonPages;

        public ExploreVideoHearing(CommonPages commonPages)
        {
            _commonPages = commonPages;
        }

        public void IndividualExploreVideoHearing()
        {
            _commonPages.ValidatePage(PageUri.ExploreVideoHearing);
            _commonPages.Continue();
        }
    }
}
