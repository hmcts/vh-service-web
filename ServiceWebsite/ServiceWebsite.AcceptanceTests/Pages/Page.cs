using FluentAssertions;
using ServiceWebsite.AcceptanceTests.Helpers;

namespace ServiceWebsite.AcceptanceTests.Pages
{
    public class Page
    {
        protected readonly BrowserContext _browserContext;
        private readonly string _urlToValidate = string.Empty;

        public Page(BrowserContext browserContext, string pageUrl)
        {
            _browserContext = browserContext;
            _urlToValidate = pageUrl;
        }

        public virtual void Validate()
        {
            if(!string.IsNullOrEmpty(_urlToValidate))
            {
                _browserContext.Retry(() =>
                {
                    _browserContext.NgDriver.Url.Should().Contain(_urlToValidate);
                });
            }
        }
    }
}