using System.Collections.Generic;
using AcceptanceTests.Common.Driver.Browser;
using AcceptanceTests.Common.Driver.Helpers;
using AcceptanceTests.Common.PageObject.Pages;
using FluentAssertions;
using ServiceWebsite.AcceptanceTests.Helpers;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public class HeaderFooterSteps
    {
        private readonly Dictionary<string, UserBrowser> _browsers;
        private readonly TestContext _c;

        public HeaderFooterSteps(Dictionary<string, UserBrowser> browsers, TestContext c)
        {
            _browsers = browsers;
            _c = c;
        }

        [Then(@"the beta banner should be displayed")]
        public void ThenTheBetaBannerShouldBeDisplayed()
        {
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(CommonPages.BetaBanner).Displayed.Should().BeTrue();
        }
    }
}
