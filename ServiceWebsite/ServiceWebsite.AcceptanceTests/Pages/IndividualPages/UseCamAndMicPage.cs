using AcceptanceTests.Common.PageObject.Helpers;
using OpenQA.Selenium;

namespace ServiceWebsite.AcceptanceTests.Pages.IndividualPages
{
    public class UseCamAndMicPage
    {
        public By WhyUseCameraLink = By.XPath("//span[contains(text(),'Why do I need to use my camera?')]");
        public By WhyUseCameraExplanation = CommonLocators.ElementContainingText("If you switch on your camera");
    }
}
