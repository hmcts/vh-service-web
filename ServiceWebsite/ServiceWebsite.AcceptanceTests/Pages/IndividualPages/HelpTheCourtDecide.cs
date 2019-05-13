using ServiceWebsite.AcceptanceTests.Helpers;

namespace ServiceWebsite.AcceptanceTests.Pages.IndividualPages
{
    public class HelpTheCourtDecide
    {
        private readonly CommonPages _commonPages;

        public HelpTheCourtDecide(CommonPages commonPages)
        {
            _commonPages = commonPages;
        }

        public void IndividualHelpCourtDecide()
        {
            _commonPages.ValidatePage(PageUri.HelpTheCourtDecidePage);
            _commonPages.Continue();
        }
    }
}