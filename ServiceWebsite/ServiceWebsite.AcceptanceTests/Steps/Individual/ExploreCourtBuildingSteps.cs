using System.Collections.Generic;
using AcceptanceTests.Common.Driver.Browser;
using AcceptanceTests.Common.Driver.Helpers;
using AcceptanceTests.Common.Driver.Support;
using AcceptanceTests.Common.PageObject.Helpers;
using AcceptanceTests.Common.Test.Helpers;
using AcceptanceTests.Common.Test.Steps;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Pages.Individual;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps.Individual
{
    [Binding]
    public class ExploreCourtBuildingSteps : ISteps
    {
        private const int ExtraTimeForVideoToLoad = 30;
        private readonly Dictionary<string, UserBrowser> _browsers;
        private readonly TestContext _c;

        public ExploreCourtBuildingSteps(Dictionary<string, UserBrowser> browsers, TestContext testContext)
        {
            _browsers = browsers;
            _c = testContext;
        }

        public void ProgressToNextPage()
        {
            _browsers[_c.CurrentUser.Key].Click(CommonLocators.ButtonWithInnerText("Watch the video"));
            _browsers[_c.CurrentUser.Key].Click(CommonLocators.ButtonWithInnerText("Continue"));
        }

        [Then(@"the exploring the court building video begins to play")]
        public void ThenTheExploringTheCourtBuildingVideoBeginsToPlay()
        {
            if (_c.ServiceWebConfig.TestConfig.TargetBrowser == TargetBrowser.Chrome ||
                _c.ServiceWebConfig.TestConfig.TargetBrowser == TargetBrowser.ChromeMac)
            {
                _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(ExploreCourtBuildingPage.Video).Click();
            }
            new VerifyVideoIsPlayingBuilder(_browsers[_c.CurrentUser.Key]).Retries(ExtraTimeForVideoToLoad).Feed(ExploreCourtBuildingPage.Video);
        }
    }
}
