using OpenQA.Selenium;
using ServiceWebsite.AcceptanceTests.Helpers;

namespace ServiceWebsite.AcceptanceTests.Pages
{
    public class DecisionJourney : JourneyStepPage
    {
        private readonly string _pageUrl;
        public DecisionJourney(BrowserContext browserContext, string pageUrl) : base(browserContext, pageUrl)
        {
            _pageUrl = pageUrl;
        }
        private By _yes => By.CssSelector("#choice-yes");
        public void SelectYes() => SetMethods.SelectRadioButton(_yes, BrowserContext);
        public void SelectYes(string detail)
        {
            SetMethods.SelectRadioButton(_yes, BrowserContext);
            SetMethods.InputValue(detail, By.Id("details"), BrowserContext);
        }
        public void SelectNo() => SetMethods.SelectRadioButton(By.Id("choice-no"), BrowserContext);
        public void Navigate()
        {
            BrowserContext.GoToPage(_pageUrl);
        }
    }
}