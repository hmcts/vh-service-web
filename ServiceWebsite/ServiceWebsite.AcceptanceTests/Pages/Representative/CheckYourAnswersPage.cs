using OpenQA.Selenium;

namespace ServiceWebsite.AcceptanceTests.Pages.Representative
{
    public static class CheckYourAnswersPage
    {
        public static By ChangePresenterLink = By.Id("changePresenter");
        public static By ChangeOtherInformationLink = By.Id("changeOtherInformation");
        public static By ContinueButton = By.Id("continue");
        public static By Email = By.Id("email");
        public static By FullName = By.Id("fullName");
        public static By PresentingAnswerText = By.Id("presentingAnswer");
        public static By OtherInformationAnswer = By.Id("otherInformationAnswer");
        public static By OtherInformationText = By.Id("otherInformation");
    }
}
