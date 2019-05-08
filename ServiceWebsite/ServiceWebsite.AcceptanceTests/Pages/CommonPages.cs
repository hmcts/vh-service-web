using FluentAssertions;
using OpenQA.Selenium;
using ServiceWebsite.AcceptanceTests.Helpers;
using System;

namespace ServiceWebsite.AcceptanceTests.Pages
{
    public class CommonPages
    {
        private readonly BrowserContext _browserContext;

        public CommonPages(BrowserContext browserContext)
        {
            _browserContext = browserContext;
        }
        private string PageUrl() => _browserContext.NgDriver.Url;

        public void ValidatePage(string url)
        {
            _browserContext.Retry(() =>
            {
                _browserContext.NgDriver.Url.Should().Contain(url);
            });
        }
        public bool HmctsLogo() => GetMethods.IsElementDisplayed(By.CssSelector("div.govuk-grid-column-one-quarter img"), _browserContext);
        public string ActualBlueScreenContent() => GetMethods.GetText(By.CssSelector("div.govuk-grid-column-three-quarters"), _browserContext).Replace("\r\n", String.Empty);
        public void Continue() => SetMethods.ClickElement(By.Id("continue"), _browserContext);
        public string PageHeading() => GetMethods.GetText(By.CssSelector("app-use-camera-microphone h1"), _browserContext);
        public string PageDetails() => GetMethods.GetText(By.CssSelector("app-show-details p"), _browserContext);
        public string AccordionDetails() => GetMethods.GetText(By.Id("message1"), _browserContext);

        // Html input tag is used for button on pages with no contents
        public void ContinueButtonAsInput() => SetMethods.ClickElement(By.CssSelector("input.govuk-button"), _browserContext);
    }
}