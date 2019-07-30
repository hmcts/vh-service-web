using FluentAssertions;
using ServiceWebsite.AcceptanceTests.Helpers;

namespace ServiceWebsite.AcceptanceTests.Pages
{
    public class Page
    {
        private readonly string _urlToValidate = string.Empty;
        protected BrowserContext BrowserContext { get; private set; }
        public string Name { get; private set; }

        public Page(BrowserContext browserContext, string pageUrl, string name)
        {
            BrowserContext = browserContext;
            _urlToValidate = pageUrl;
            Name = name;
        }

        public virtual void Validate()
        {
            if(!string.IsNullOrEmpty(_urlToValidate))
            {
                BrowserContext.Retry(() =>
                {
                    BrowserContext.NgDriver.Url.Should().Contain(_urlToValidate);
                });
            }
        }
    }
}