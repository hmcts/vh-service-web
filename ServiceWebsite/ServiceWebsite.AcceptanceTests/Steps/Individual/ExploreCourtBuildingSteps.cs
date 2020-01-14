using System.Collections.Generic;
using AcceptanceTests.Common.Driver.Browser;
using AcceptanceTests.Common.Driver.Helpers;
using AcceptanceTests.Common.PageObject.Helpers;
using AcceptanceTests.Common.Test.Helpers;
using AcceptanceTests.Common.Test.Steps;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Pages;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps.Individual
{
    [Binding]
    public class ExploreCourtBuildingSteps : ISteps
    {
        private readonly Dictionary<string, UserBrowser> _browsers;
        private readonly TestContext _c;
        private readonly ExploreCourtBuildingPage _exploreCourtBuildingPage;

        public ExploreCourtBuildingSteps(Dictionary<string, UserBrowser> browsers, TestContext testContext, ExploreCourtBuildingPage exploreCourtBuildingPage)
        {
            _browsers = browsers;
            _c = testContext;
            _exploreCourtBuildingPage = exploreCourtBuildingPage;
        }

        public void ProgressToNextPage()
        {
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(CommonLocators.ButtonWithInnerText("Play the video")).Click();
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(CommonLocators.ButtonWithInnerText("Continue")).Click();
        }

        [Then(@"the exploring the court building video begins to play")]
        public void ThenTheExploringTheCourtBuildingVideoBeginsToPlay()
        {
            new VerifyVideoIsPlayingBuilder(_browsers[_c.CurrentUser.Key]).Feed(_exploreCourtBuildingPage.Video);
        }
    }
}
