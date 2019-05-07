using ServiceWebsite.AcceptanceTests.Pages;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public sealed class CommonSteps
    {
        private readonly CommonPages _commonPages;

        public CommonSteps(CommonPages commonPages)
        {
            _commonPages = commonPages;
        }

        public void ParticipantContinuesWithSuitabilityQuestionnaire()
        {
            _commonPages.Continue();
        }
    }
}
