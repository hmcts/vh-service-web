using FluentAssertions;
using OpenQA.Selenium;
using ServiceWebsite.AcceptanceTests.Helpers;
using System;

namespace ServiceWebsite.AcceptanceTests.Pages
{
    public class Page
    {
        protected readonly BrowserContext _browserContext;
        private readonly string _urlToValidate = string.Empty;

        public Page(BrowserContext browserContext)
        {
            _browserContext = browserContext;
        }

        public virtual void Validate()
        {
            if(!string.IsNullOrEmpty(UrlToValidate))
            {
                _browserContext.Retry(() =>
                {
                    _browserContext.NgDriver.Url.Should().Contain(UrlToValidate);
                });
            }
        }

        protected virtual string UrlToValidate => string.Empty;
    }
}