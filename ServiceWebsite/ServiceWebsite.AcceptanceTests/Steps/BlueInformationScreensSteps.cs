using ServiceWebsite.AcceptanceTests.Pages;
using ServiceWebsite.AcceptanceTests.Pages.IndividualPages;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public class BlueInformationScreensSteps
    {
        private readonly DifferentHearingTypes _differentHearingTypes;
        private readonly AboutHearings _aboutHearings;
        private readonly CommonPage _commonPages;

        public BlueInformationScreensSteps(DifferentHearingTypes differentHearingTypes, CommonPage commonPages, AboutHearings aboutHearings)
        {
            _differentHearingTypes = differentHearingTypes;
            _commonPages = commonPages;
            _aboutHearings = aboutHearings;
        }
        [Then(@"Individual should view blue information screens")]
        public void ThenIndividualShouldViewBlueInformationScreen()
        {
            _aboutHearings.Continue();
            _differentHearingTypes.Continue();
        }
    }
}