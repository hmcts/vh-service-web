using AcceptanceTests.Common.PageObject.Helpers;
using OpenQA.Selenium;

namespace ServiceWebsite.AcceptanceTests.Pages.Representative
{
    public static class PresentingTheCasePage
    {
        public static By FullNameTextField = By.Id("presentingCaseName");
        public static By EmailTextField = By.Id("presentingCaseEmail");
        public static By WhoWillBePresentingText = CommonLocators.ElementContainingText("I will be presenting the case");
    }
}
