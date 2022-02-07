using AcceptanceTests.Common.PageObject.Helpers;
using OpenQA.Selenium;

namespace ServiceWebsite.AcceptanceTests.Pages
{
    public static class CommonServiceWebPage
    {
        public static By SignOutButton = By.Id("header-logout-link");
        public static By ContactLink = By.Id("citizen-contact-details");
        public static By CaseName = By.Id("caseName");
        public static By CaseTypeCaseNumber = By.Id("caseTypeCaseNumber");
        public static By ScheduledDate = By.Id("scheduledDate");
        public static By ScheduledTime = By.Id("scheduledTime");
        public static By ScheduledDateTime = By.Id("scheduledDateTime");
        public static By NoHearingsWarningMessage = CommonLocators.ElementContainingText("You do not have a video hearing today");
    }
}