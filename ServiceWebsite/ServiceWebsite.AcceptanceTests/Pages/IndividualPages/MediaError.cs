using FluentAssertions;
using ServiceWebsite.AcceptanceTests.Helpers;

namespace ServiceWebsite.AcceptanceTests.Pages.IndividualPages
{
    public class MediaError
    {
        private readonly BrowserContext _context;
        private readonly CommonPages _commonPages;

        public MediaError(BrowserContext browserContext, CommonPages commonPages)
        {
            _context = browserContext;
            _commonPages = commonPages;
        }
        private const string PageUrl = "/media-error";

        public void BlockedCameraAndMic()
        {
            _commonPages.ValidatePage(PageUrl);
        }
    }
}