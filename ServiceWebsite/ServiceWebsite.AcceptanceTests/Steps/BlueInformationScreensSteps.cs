using ServiceWebsite.AcceptanceTests.Pages.IndividualPages;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public class BlueInformationScreensSteps
    {
        private readonly DifferentHearingTypes _blueScreens;
        private readonly CommonSteps _commonSteps;

        public BlueInformationScreensSteps(DifferentHearingTypes differentHearingTypes, CommonSteps commonSteps)
        {
            _blueScreens = differentHearingTypes;
            _commonSteps = commonSteps;
        }
        [Then(@"Individual should view blue information screens")]
        public void ThenIndividualShouldViewBlueInformationScreen()
        {
            _blueScreens.AboutHearingsBlueScreen();
            _commonSteps.ParticipantContinuesWithSuitabilityQuestionnaire();
            _blueScreens.DifferentHearingTypesBlueScreen();
        }
    }
}