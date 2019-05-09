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

        private const string ExpectedBlueScreenContent = "The court will decide which method is suitable for your hearing. You can help the court decide by answering some questions.Before you answer the questions, let’s find out more about the different types of hearing.Continue";
        public void DifferentHearingTypesBlueScreen()
        {
            _commonPages.ValidatePage("/different-hearing-types");
        }
    }
}