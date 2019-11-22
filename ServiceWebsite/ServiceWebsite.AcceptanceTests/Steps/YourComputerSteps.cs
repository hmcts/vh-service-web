using FluentAssertions;
using OpenQA.Selenium;
using ServiceWebsite.AcceptanceTests.Helpers;
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
            var hearingDueDate = GetMethods.IsElementDisplayed(By.CssSelector("#form-container strong"), _context);
            hearingDueDate.Should().BeTrue();
        }
    }
}