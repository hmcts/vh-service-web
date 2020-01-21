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
        private readonly CommonPages _commonPages;

        public HeaderFooterSteps(Dictionary<string, UserBrowser> browsers, TestContext c, CommonPages commonPages)
        {
            _browsers = browsers;
            _c = c;
            _commonPages = commonPages;
        }

        [Then(@"the beta banner should be displayed")]
        public void ThenTheBetaBannerShouldBeDisplayed()
        {
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(_commonPages.BetaBanner).Displayed.Should().BeTrue();
        }
    }
}
