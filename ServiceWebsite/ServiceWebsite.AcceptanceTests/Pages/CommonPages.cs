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
        public void Continue() => SetMethods.ClickElement(By.Id("continue"), _browserContext);
    }
}