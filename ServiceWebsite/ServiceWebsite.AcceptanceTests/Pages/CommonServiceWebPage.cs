using OpenQA.Selenium;

namespace ServiceWebsite.AcceptanceTests.Pages
{
    public class CommonServiceWebPage
    {
        public By SignOutButton = By.Id("header-logout-link");
        public By IndividualContactLink = By.Id("citizen-contact-details");
        public By RepContactLink { get; set; }
        public By ErrorMessages = By.CssSelector("span.govuk-error-message");
    }
}