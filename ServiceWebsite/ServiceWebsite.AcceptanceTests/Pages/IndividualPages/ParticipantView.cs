using ServiceWebsite.AcceptanceTests.Helpers;

namespace ServiceWebsite.AcceptanceTests.Pages.IndividualPages
{
    public class ParticipantView
    {
        private readonly BrowserContext _context;
        private readonly CommonPages _commonPages;

        public ParticipantView(BrowserContext browserContext, CommonPages commonPages)
        {
            _context = browserContext;
            _commonPages = commonPages;
        }
        private const string PageUrl = "/participant-view";

        public void IndividualViewsInformationVideo()
        {
            _commonPages.ValidatePage(PageUrl);
        }
    }
}