using OpenQA.Selenium;

namespace ServiceWebsite.AcceptanceTests.Pages
{
    public class CommonServiceWebPage
    {
        public By SignOutButton = By.Id("header-logout-link");
        public By ContactLink = By.Id("citizen-contact-details");
        public By ErrorMessages = By.CssSelector("span.govuk-error-message");
        public By HearingDetails = By.ClassName("vh-ml5");
    }
}