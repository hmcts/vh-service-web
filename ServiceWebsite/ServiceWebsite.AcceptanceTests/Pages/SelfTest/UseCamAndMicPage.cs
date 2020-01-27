using AcceptanceTests.Common.PageObject.Helpers;
using OpenQA.Selenium;

namespace ServiceWebsite.AcceptanceTests.Pages.SelfTest
{
    public static class UseCamAndMicPage
    {
        public static By WhyUseCameraLink = By.XPath("//span[contains(text(),'Why do I need to use my camera?')]");
        public static By WhyUseCameraExplanation = CommonLocators.ElementContainingText("If you switch on your camera");
    }
}
