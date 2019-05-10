using ServiceWebsite.AcceptanceTests.Helpers;

namespace ServiceWebsite.AcceptanceTests.Pages.IndividualPages
{
    public class AboutYou
    {
        private readonly CommonPages _commonPages;

        public AboutYou(CommonPages commonPages)
        {
            _commonPages = commonPages;
        }

        public void AboutIndividual()
        {
            _commonPages.ValidatePage(PageUri.AboutYouPage);
        }
    }
}
