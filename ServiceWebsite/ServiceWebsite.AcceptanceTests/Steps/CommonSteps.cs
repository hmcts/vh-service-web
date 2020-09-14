using System.Collections.Generic;
using System.Linq;
using AcceptanceTests.Common.Driver.Drivers;
using AcceptanceTests.Common.Driver.Helpers;
using AcceptanceTests.Common.PageObject.Helpers;
using FluentAssertions;
using Selenium.Axe;
using ServiceWebsite.AcceptanceTests.Data;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Pages;
using ServiceWebsite.Services.TestApi;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public class CommonSteps
    {
        private readonly Dictionary<User, UserBrowser> _browsers;
        private readonly TestContext _c;

        public CommonSteps(Dictionary<User, UserBrowser> browsers, TestContext testContext)
        {
            _browsers = browsers;
            _c = testContext;
        }

        [When(@"the user clicks the (.*) button")]
        public void WhenTheUserClicksTheButton(string innerText)
        {
            _browsers[_c.CurrentUser].Click(CommonLocators.ButtonWithInnerText(innerText));
        }

        [When(@"the user selects the '(.*)' radiobutton")]
        public void WhenTheUserSelectsTheRadiobutton(string label)
        {
            _browsers[_c.CurrentUser].ClickRadioButton(CommonLocators.RadioButtonWithLabel(label));
            _browsers[_c.CurrentUser].Driver.WaitUntilElementExists(CommonLocators.RadioButtonWithLabel(label)).Selected.Should().BeTrue();
        }

        [When(@"the user clicks the (.*) link")]
        public void WhenTheUserClicksTheLink(string linkText)
        {
            _browsers[_c.CurrentUser].Driver.WaitUntilVisible(CommonLocators.LinkWithText(linkText)).Displayed.Should().BeTrue();
            _browsers[_c.CurrentUser].ClickLink(CommonLocators.LinkWithText(linkText));
        }

        [When(@"attempts to click (.*) without selecting an answer")]
        [When(@"attempts to click (.*) without providing additional information")]
        public void WhenAttemptsToClickContinueWithoutSelectingAnAnswer(string innerText)
        {
            _browsers[_c.CurrentUser].Click(CommonLocators.ButtonWithInnerText(innerText));
        }

        [Then(@"contact details are available")]
        public void ThenContactDetailsAreAvailable()
        {
            _browsers[_c.CurrentUser].Driver.WaitForPageToLoad();
            _browsers[_c.CurrentUser].ClickLink(CommonServiceWebPage.ContactLink);
            _browsers[_c.CurrentUser].Driver.WaitUntilVisible(CommonLocators.ElementContainingText(_c.WebConfig.TestConfig.CommonData.CommonOnScreenData.VhoPhone)).Displayed.Should().BeTrue();
            _browsers[_c.CurrentUser].Driver.WaitUntilVisible(CommonLocators.ElementContainingText(_c.WebConfig.TestConfig.CommonData.CommonOnScreenData.VhoEmail)).Displayed.Should().BeTrue();
        }

        [Then(@"a message appears stating '(.*)'")]
        [Then(@"an error message appears stating '(.*)'")]
        public void ThenAMessageAppearsStating(string message)
        {
            _browsers[_c.CurrentUser].Driver.WaitUntilVisible(CommonLocators.ElementContainingText(message)).Displayed.Should().BeTrue();
        }

        [Then(@"the hearing date is displayed correctly")]
        public void ThenTheHearingDateIsDisplayedCorrectly()
        {
            var scheduledDate = _c.TimeZone.Adjust(_c.Test.Hearing.Scheduled_date_time).ToString(DateFormats.CommonDateFormat);
            var scheduledTime = _c.TimeZone.Adjust(_c.Test.Hearing.Scheduled_date_time).ToString(DateFormats.CommonTimeFormat).Replace("AM", "am").Replace("PM", "pm");
            _browsers[_c.CurrentUser].Driver.WaitUntilVisible(CommonServiceWebPage.ScheduledDateTime).Text.Should().ContainAll(scheduledDate, scheduledTime);
        }

        [Then(@"the hearing details are displayed correctly")]
        public void ThenTheHearingDetailsAreDisplayedCorrectly()
        {
            var scheduledDate = _c.TimeZone.Adjust(_c.Test.Hearing.Scheduled_date_time).ToString(DateFormats.HearingDetailsDateInUkFormat).Replace(",", "");
            var scheduledTime = _c.TimeZone.Adjust(_c.Test.Hearing.Scheduled_date_time).ToString(DateFormats.HearingDetailsTime);
            var scheduledDateForPreProd = _c.TimeZone.Adjust(_c.Test.Hearing.Scheduled_date_time).ToString(DateFormats.HearingDetailsTimeSingleDayFormat).Replace(",", "");
            _browsers[_c.CurrentUser].Driver.WaitUntilVisible(CommonServiceWebPage.ScheduledDate).Text.Should().ContainAny(scheduledDate, scheduledDateForPreProd);
            _browsers[_c.CurrentUser].Driver.WaitUntilVisible(CommonServiceWebPage.ScheduledTime).Text.Should().Contain(scheduledTime);
            _browsers[_c.CurrentUser].Driver.WaitUntilVisible(CommonServiceWebPage.CaseName).Text.Should().Contain(_c.Test.Hearing.Cases.First().Name);
            _browsers[_c.CurrentUser].Driver.WaitUntilVisible(CommonServiceWebPage.CaseTypeCaseNumber).Text.Should().ContainAll(_c.Test.Hearing.Cases.First().Number, _c.Test.Hearing.Case_type_name);
        }

        [Then(@"the page should be accessible")]
        public void ThenThePageShouldBeAccessible()
        {
            var axeResult = new AxeBuilder(_browsers[_c.CurrentUser].Driver).Analyze();
            axeResult.Violations.Should().BeEmpty();
        }
    }
}
