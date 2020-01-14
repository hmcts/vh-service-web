using System;
using System.Collections.Generic;
using AcceptanceTests.Common.Driver.Browser;
using AcceptanceTests.Common.Driver.Helpers;
using AcceptanceTests.Common.PageObject.Helpers;
using AcceptanceTests.Common.PageObject.Pages;
using FluentAssertions;
using ServiceWebsite.AcceptanceTests.Data;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Pages;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public class CommonSteps
    {
        private readonly Dictionary<string, UserBrowser> _browsers;
        private readonly TestContext _c;
        private readonly CommonPages _commonPages;
        private readonly CommonServiceWebPage _commonServiceWebPage;

        public CommonSteps(Dictionary<string, UserBrowser> browsers, TestContext testContext, CommonPages commonPages, CommonServiceWebPage commonServiceWebPage)
        {
            _browsers = browsers;
            _c = testContext;
            _commonPages = commonPages;
            _commonServiceWebPage = commonServiceWebPage;
        }

        [When(@"the user clicks the (.*) button")]
        public void WhenTheUserClicksTheNextButton(string innerText)
        {
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(CommonLocators.ButtonWithInnerText(innerText)).Click();
        }

        [When(@"the user selects the '(.*)' radiobutton")]
        public void WhenTheUserSelectsTheRadiobutton(string label)
        {
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilElementExists(CommonLocators.RadioButtonWithLabel(label)).Click();
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilElementExists(CommonLocators.RadioButtonWithLabel(label)).Selected.Should().BeTrue();
        }

        [When(@"attempts to click (.*) without selecting an answer")]
        [When(@"attempts to click (.*) without providing additional information")]
        public void WhenAttemptsToClickContinueWithoutSelectingAnAnswer(string innerText)
        {
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(CommonLocators.ButtonWithInnerText(innerText)).Click();
        }

        [Then(@"contact details are available")]
        public void ThenContactDetailsAreAvailable()
        {
            var element = _c.CurrentUser.Role.ToLower().Equals("individual") ? _commonServiceWebPage.IndividualContactLink : _commonServiceWebPage.RepContactLink;
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(element).Click();
            _browsers[_c.CurrentUser.Key].Driver
                .WaitUntilVisible(CommonLocators.ElementContainingText(_c.ServiceWebConfig.TestConfig.CommonData.CommonOnScreenData.VhoPhone))
                .Displayed.Should().BeTrue();
            _browsers[_c.CurrentUser.Key].Driver
                .WaitUntilVisible(CommonLocators.ElementContainingText(_c.ServiceWebConfig.TestConfig.CommonData.CommonOnScreenData.VhoEmail))
                .Displayed.Should().BeTrue();
        }

        [Then(@"a message appears stating '(.*)'")]
        [Then(@"an error message appears stating '(.*)'")]
        public void ThenAMessageAppearsStating(string message)
        {
            _browsers[_c.CurrentUser.Key].Driver
                .WaitUntilVisible(CommonLocators.ElementContainingText(message))
                .Displayed.Should().BeTrue();
        }

        [Then(@"the hearing date is displayed correctly")]
        public void ThenTheHearingDateIsDisplayedCorrectly()
        {
            if (_c.Test.Hearing.Scheduled_date_time == null)
                throw new DataMisalignedException("Scheduled date time must be set.");
            var scheduledDate = _c.Test.Hearing.Scheduled_date_time?.ToLocalTime().ToString(DateFormats.YourComputerDateTime).Replace("AM", "am").Replace("PM", "pm");
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(CommonLocators.ElementContainingText(scheduledDate)).Displayed.Should().BeTrue();
        }
    }
}
