using OpenQA.Selenium;
using ServiceWebsite.AcceptanceTests.Helpers;

namespace ServiceWebsite.AcceptanceTests.Pages.IndividualPages
{
    public class ContactUs : Page
    {
        public ContactUs(BrowserContext browserContext, string url) : base(browserContext, url)
        {

        }
        public bool ContactUsForHelp()
        {
            SetMethods.ClickElement(By.Id("citizen-contact-details"), _browserContext);
            var contactEmailHint = GetMethods.IsElementDisplayed(By.Id("contact-us-email-times-hint"), _browserContext);
            var contactTelephoneHint = GetMethods.IsElementDisplayed(By.Id("contact-us-telephone-times-hint"), _browserContext);
            var isElementDisplayed = contactEmailHint && contactTelephoneHint;
            return isElementDisplayed;
        }
    }
}