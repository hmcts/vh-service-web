using OpenQA.Selenium;
using ServiceWebsite.AcceptanceTests.Constants;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Navigation;

namespace ServiceWebsite.AcceptanceTests.Pages.RepresentativePages
{
    public class PresentingTheCase: JourneyStepPage
    {
        public PresentingTheCase(BrowserContext browserContext) : base(
            browserContext,
            RepresentativePageUrl.PresentingTheCase,
            RepresentativePageNames.PresentingTheCase)
        {
        }

        public void Select(PresentingTheCaseTypes type)
        {
            string selectorId = string.Empty;
            switch (type)
            {
                case PresentingTheCaseTypes.IWillBePresentingTheCase:
                    selectorId = "i-will-be-presenting";
                    break;
                case PresentingTheCaseTypes.SomeoneWillBePresentingTheCase:
                    selectorId = "someone-will-presenting";
                    break;
            }
            BrowserContext.Retry(() => SetMethods.SelectRadioButton(By.XPath($"//*[@for='{selectorId}']"), BrowserContext), 1);
        }
    }
}
