using System.Collections.Generic;
using System.Linq;
using AcceptanceTests.Common.Driver.Browser;
using AcceptanceTests.Common.Driver.Helpers;
using AcceptanceTests.Common.PageObject.Helpers;
using FluentAssertions;
using Selenium.Axe;
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

        public CommonSteps(Dictionary<string, UserBrowser> browsers, TestContext testContext)
        {
            _browsers = browsers;
            _c = testContext;
        }

        [When(@"the user clicks the (.*) button")]
        public void WhenTheUserClicksTheButton(string innerText)
        {
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(CommonLocators.ButtonWithInnerText(innerText)).Click();
        }

        [When(@"the user selects the '(.*)' radiobutton")]
        public void WhenTheUserSelectsTheRadiobutton(string label)
        {
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilElementExists(CommonLocators.RadioButtonWithLabel(label)).Click();
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilElementExists(CommonLocators.RadioButtonWithLabel(label)).Selected.Should().BeTrue();
        }

        [When(@"the user clicks the (.*) link")]
        public void WhenTheUserClicksTheChangeCameraOrMicrophoneLink(string linkText)
        {
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(CommonLocators.LinkWithText(linkText)).Displayed.Should().BeTrue();
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(CommonLocators.LinkWithText(linkText)).Click();
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
            _browsers[_c.CurrentUser.Key].Driver.WaitForPageToLoad();
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(CommonServiceWebPage.ContactLink).Click();
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(CommonLocators.ElementContainingText(_c.ServiceWebConfig.TestConfig.CommonData.CommonOnScreenData.VhoPhone)).Displayed.Should().BeTrue();
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(CommonLocators.ElementContainingText(_c.ServiceWebConfig.TestConfig.CommonData.CommonOnScreenData.VhoEmail)).Displayed.Should().BeTrue();
        }

        [Then(@"a message appears stating '(.*)'")]
        [Then(@"an error message appears stating '(.*)'")]
        public void ThenAMessageAppearsStating(string message)
        {
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(CommonLocators.ElementContainingText(message)).Displayed.Should().BeTrue();
        }

        [Then(@"the hearing date is displayed correctly")]
        public void ThenTheHearingDateIsDisplayedCorrectly()
        {
            var scheduledDate = _c.Test.Hearing.Scheduled_date_time.ToLocalTime().ToString(DateFormats.CommonDateFormat);
            var scheduledTime = _c.Test.Hearing.Scheduled_date_time.ToLocalTime().ToString(DateFormats.CommonTimeFormat).Replace("AM", "am").Replace("PM", "pm");
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(CommonServiceWebPage.ScheduledDateTime).Text.Should().ContainAll(scheduledDate, scheduledTime);
        }

        [Then(@"the hearing details are displayed correctly")]
        public void ThenTheHearingDetailsAreDisplayedCorrectly()
        {
            var scheduledDate = _c.Test.Hearing.Scheduled_date_time.ToLocalTime().ToString(DateFormats.HearingDetailsDateInUkFormat).Replace(",", "");
            var scheduledTime = _c.Test.Hearing.Scheduled_date_time.ToLocalTime().ToString(DateFormats.HearingDetailsTime);
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(CommonServiceWebPage.ScheduledDate).Text.Should().Contain(scheduledDate);
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(CommonServiceWebPage.ScheduledTime).Text.Should().Contain(scheduledTime);
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(CommonServiceWebPage.CaseName).Text.Should().Contain(_c.Test.Hearing.Cases.First().Name);
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(CommonServiceWebPage.CaseTypeCaseNumber).Text.Should().ContainAll(_c.Test.Hearing.Cases.First().Number, _c.Test.Hearing.Case_type_name);
        }

        [Then(@"the page should be accessible")]
        public void ThenThePageShouldBeAccessible()
        {
            var axeResult = new AxeBuilder(_browsers[_c.CurrentUser.Key].Driver)
                .DisableRules( // BUG: Once VIH-5174 bug is fixed, remove these exclusions
                    "duplicate-id-active", // https://dequeuniversity.com/rules/axe/3.4/duplicate-id-active?application=axeAPI
                    "region", // https://dequeuniversity.com/rules/axe/3.3/region?application=axeAPI
                    "landmark-main-is-top-level", // https://dequeuniversity.com/rules/axe/3.3/landmark-main-is-top-level?application=axeAPI
                    "landmark-one-main", // https://dequeuniversity.com/rules/axe/3.3/landmark-one-main?application=axeAPI
                    "landmark-no-duplicate-banner", // https://dequeuniversity.com/rules/axe/3.3/landmark-no-duplicate-banner?application=axeAPI
                    "landmark-no-duplicate-contentinfo", // https://dequeuniversity.com/rules/axe/3.3/landmark-no-duplicate-contentinfo?application=axeAPI
                    "page-has-heading-one", // https://dequeuniversity.com/rules/axe/3.3/page-has-heading-one?application=axeAPI
                    "landmark-unique") // https://dequeuniversity.com/rules/axe/3.3/landmark-unique?application=axeAPI
                .Analyze();
            axeResult.Violations.Should().BeEmpty();
        }
    }
}
