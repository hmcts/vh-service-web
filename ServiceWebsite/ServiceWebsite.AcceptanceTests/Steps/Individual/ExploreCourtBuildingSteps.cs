using System.Collections.Generic;
using AcceptanceTests.Common.Driver.Drivers;
using AcceptanceTests.Common.Driver.Enums;
using AcceptanceTests.Common.Driver.Helpers;
using AcceptanceTests.Common.PageObject.Helpers;
using AcceptanceTests.Common.Test.Helpers;
using AcceptanceTests.Common.Test.Steps;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Pages.Individual;
using ServiceWebsite.Services.TestApi;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps.Individual
{
    [Binding]
    public class ExploreCourtBuildingSteps : ISteps
    {
        private const int ExtraTimeForVideoToLoad = 30;
        private readonly Dictionary<User, UserBrowser> _browsers;
        private readonly TestContext _c;

        public ExploreCourtBuildingSteps(Dictionary<User, UserBrowser> browsers, TestContext testContext)
        {
            _browsers = browsers;
            _c = testContext;
        }

        public void ProgressToNextPage()
        {
            _browsers[_c.CurrentUser].Click(CommonLocators.ButtonWithInnerText("Watch the video"));
            _browsers[_c.CurrentUser].Click(CommonLocators.ButtonWithInnerText("Continue"));
        }

        [Then(@"the exploring the court building video begins to play")]
        public void ThenTheExploringTheCourtBuildingVideoBeginsToPlay()
        {
            if (_c.WebConfig.TestConfig.TargetBrowser == TargetBrowser.Chrome)
            {
                _browsers[_c.CurrentUser].Driver.WaitUntilVisible(ExploreCourtBuildingPage.Video).Click();
            }
            new VerifyVideoIsPlayingBuilder(_browsers[_c.CurrentUser]).Retries(ExtraTimeForVideoToLoad).Feed(ExploreCourtBuildingPage.Video);
        }
    }
}
