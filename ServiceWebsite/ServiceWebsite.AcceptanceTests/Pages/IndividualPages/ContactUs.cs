using OpenQA.Selenium;
using ServiceWebsite.AcceptanceTests.Helpers;

namespace ServiceWebsite.AcceptanceTests.Pages.IndividualPages
{
    public class ContactUs : Page
    {
        public ContactUs(BrowserContext browserContext, string url) : base(browserContext, url)
        {

        }
        public bool VerifyDetails()
        {
            SetMethods.ClickElement(By.Id("citizen-contact-details"), BrowserContext);
            var contactEmailHint = GetMethods.IsElementDisplayed(By.Id("contact-us-email-times-hint"), BrowserContext);
            var contactTelephoneHint = GetMethods.IsElementDisplayed(By.Id("contact-us-telephone-times-hint"), BrowserContext);
            var isElementDisplayed = contactEmailHint && contactTelephoneHint;
            return isElementDisplayed;
        }
    }
}