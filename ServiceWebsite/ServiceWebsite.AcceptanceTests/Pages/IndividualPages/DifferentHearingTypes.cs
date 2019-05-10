using ServiceWebsite.AcceptanceTests.Helpers;

namespace ServiceWebsite.AcceptanceTests.Pages.IndividualPages
{
    public class DifferentHearingTypes : JourneyStepPage
    {
        public DifferentHearingTypes(BrowserContext browserContext) : base(browserContext)
        {

        }
        protected override string UrlToValidate => PageUri.DifferentHearingTypesPage;
    }
}