using OpenQA.Selenium;

namespace ServiceWebsite.AcceptanceTests.Pages
{
    public static class CommonServiceWebPage
    {
        public static By SignOutButton = By.Id("header-logout-link");
        public static By ContactLink = By.Id("citizen-contact-details");
        public static By HearingDetails = By.ClassName("vh-ml5");
    }
}