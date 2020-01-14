using AcceptanceTests.Common.PageObject.Helpers;
using OpenQA.Selenium;

namespace ServiceWebsite.AcceptanceTests.Pages
{
    public class PresentingTheCasePage
    {
        public By FullNameTextField = By.Id("presentingCaseName");
        public By EmailTextField = By.Id("presentingCaseEmail");
        public By WhoWillBePresentingText = CommonLocators.ElementContainingText("I will be presenting the case");
    }
}
