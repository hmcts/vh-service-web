using FluentAssertions;
using OpenQA.Selenium;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Models;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public sealed class YourComputerSteps
    {
        private readonly BrowserContext _context;
        public YourComputerSteps(BrowserContext context )
        {
            _context = context;
        }
        [Given(@"Hearing due date is in the future")]
        public void GivenHearingDueDateIsInTheFuture()
        {
            var date = CreateHearingRequest.ScheduleDateTime;
            var day = date.ToString("dddd dd MMMM");
            var hearingDueDate = GetMethods.GetText(By.CssSelector("#form-container strong"), _context);
            hearingDueDate.Should().Contain($"{day}");
        }
    }
}