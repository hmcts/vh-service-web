using FluentAssertions;
using ServiceWebsite.AcceptanceTests.Helpers;

namespace ServiceWebsite.AcceptanceTests.Pages.IndividualPages
{
    public class DifferentHearingTypes
    {
        private readonly BrowserContext _browserContext;
        private readonly CommonPages _commonPages;
        public DifferentHearingTypes(BrowserContext browserContext, CommonPages commonPages)
        {
            _browserContext = browserContext;
           _commonPages = commonPages;
        }

        public void DifferentHearingTypesBlueScreen()
        {
            _commonPages.ValidatePage("/different-hearing-types");
        }
    }
}