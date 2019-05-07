using FluentAssertions;
using OpenQA.Selenium;
using ServiceWebsite.AcceptanceTests.Helpers;
using System;

namespace ServiceWebsite.AcceptanceTests.Pages.IndividualPages
{
    public class AboutHearings
    {
        private readonly BrowserContext _context;
        private readonly CommonPages _commonPages;

        public AboutHearings(BrowserContext browserContext, CommonPages commonPages)
        {
            _context = browserContext;
            _commonPages = commonPages;
        }
        
        public bool HmctsLogo() => _context.NgDriver.WaitUntilElementVisible(By.CssSelector("div.govuk-grid-column-one-quarter img")).Displayed;
        public string ActualBlueScreenContent() => _context.NgDriver.WaitUntilElementVisible(By.CssSelector("div.govuk-grid-column-three-quarters")).Text.Replace("\r\n", String.Empty);
        private const string ExpectedBlueScreenContent = "Hearings like yours can take place:In a court buildingAt these hearings, all participants gather in the courtroom in front of the judge.By videoThese hearings allow you to be seen and heard in court without having to travel. All participants, including the judge, sit in different locations in front of a computer. They can see and hear each other throughout the hearing.Next";
        public void AboutHearingsBlueScreen()
        {
            _commonPages.ValidatePage("/about-hearings");
            ActualBlueScreenContent().Trim().Should().Be(ExpectedBlueScreenContent);
            HmctsLogo().Should().BeTrue();
        }
    }
}