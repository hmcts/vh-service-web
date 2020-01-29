﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using AcceptanceTests.Common.Api.Hearings;
using AcceptanceTests.Common.Api.Requests;
using AcceptanceTests.Common.Data.Questions;
using AcceptanceTests.Common.Driver.Browser;
using AcceptanceTests.Common.Driver.Helpers;
using AcceptanceTests.Common.PageObject.Helpers;
using FluentAssertions;
using Selenium.Axe;
using ServiceWebsite.AcceptanceTests.Data;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Pages;
using ServiceWebsite.BookingsAPI.Client;
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

        [Given(@"(.*) has already submitted checklist and self test")]
        public void GivenIndividualHasAlreadySubmittedChecklistAndSelfTest(string user)
        {
            var answers = new SuitabilityAnswerRequestBuilder().WithDefaultData(_c.ServiceWebConfig.TestConfig.TestData).AllAnswers(user);
            SubmitAnswers(answers);
        }

        [Given(@"(.*) has already submitted checklist")]
        public void GivenIndividualHasAlreadySubmittedChecklist(string user)
        {
            var answers = new SuitabilityAnswerRequestBuilder().WithDefaultData(_c.ServiceWebConfig.TestConfig.TestData).ChecklistAnswersOnly(user);
            SubmitAnswers(answers);
        }

        private void SubmitAnswers(IEnumerable<SuitabilityAnswersRequest> answers)
        {
            var bookingsApiManager = new BookingsApiManager(_c.ServiceWebConfig.VhServices.BookingsApiUrl, _c.Tokens.BookingsApiBearerToken);
            var participantId = _c.Test.Hearing.Participants.First(x => x.Last_name.ToLower().Equals(_c.CurrentUser.Lastname.ToLower())).Id;
            var response = bookingsApiManager.SetSuitabilityAnswers(_c.Test.Hearing.Id, participantId, answers);
            response.StatusCode.Should().Be(HttpStatusCode.NoContent);
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
            var scheduledDate = _c.Test.Hearing.Scheduled_date_time.ToLocalTime().ToString(DateFormats.HearingDetailsDateInUkFormat).Replace(",", "");
            var scheduledTime = _c.Test.Hearing.Scheduled_date_time.ToLocalTime().ToString(DateFormats.HearingDetailsTime);
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

        [Then(@"the answers have been stored")]
        public void ThenAnswersHaveBeenStored()
        {
            var answers = GetAnswersFromBookingsApi();
            answers.Count.Should().BeGreaterThan(0);
            RemoveSelfTestQuestion(answers);
            answers.Count.Should().Be(_c.Test.Answers.Count);
            new VerifyAnswersMatch().Expected(_c.Test.Answers).Actual(answers);
        }

        private void RemoveSelfTestQuestion(IEnumerable<SuitabilityAnswerResponse> answers)
        {
            if (_c.Test.Answers.Any(x => x.QuestionKey.Equals(SelfTestQuestionKeys.SelfTestScoreQuestion)) &&
                !answers.Any(x => x.Key.Equals(SelfTestQuestionKeys.SelfTestScoreQuestion)))
            {
                _c.Test.Answers.Remove(_c.Test.Answers.First(x => x.QuestionKey.Equals(SelfTestQuestionKeys.SelfTestScoreQuestion)));
            }
        }

        [Then(@"the answers have not been stored")]
        public void ThenTheAnswersHaveNotBeenStored()
        {
            var answers = GetAnswersFromBookingsApi();
            answers.Count.Should().Be(0);
        }

        [Then(@"only the about you answers have been stored")]
        public void ThenOnlyTheAboutYouAnswersHaveBeenStored()
        {
            var answers = GetAnswersFromBookingsApi();
            answers.Any(x => x.Key.Equals(IndividualQuestionKeys.AboutYouQuestion)).Should().BeTrue();
            answers.Any(x => x.Key.Equals(IndividualQuestionKeys.CameraMicrophoneQuestion)).Should().BeTrue();
            answers.Any(x => x.Key.Equals(IndividualQuestionKeys.ComputerQuestion)).Should().BeTrue();
            answers.Any(x => x.Key.Equals(IndividualQuestionKeys.ConsentQuestion)).Should().BeTrue();
            answers.Any(x => x.Key.Equals(IndividualQuestionKeys.InternetQuestion)).Should().BeTrue();
            answers.Any(x => x.Key.Equals(IndividualQuestionKeys.InterpreterQuestion)).Should().BeTrue();
            answers.Any(x => x.Key.Equals(IndividualQuestionKeys.RoomQuestion)).Should().BeTrue();
        }

        [Then(@"only the your hearing answers have been stored")]
        public void ThenOnlyTheYourHearingAnswersHaveBeenStored()
        {
            var answers = GetAnswersFromBookingsApi();
            answers.Any(x => x.Key.Equals(RepresentativeQuestionKeys.OtherInformation)).Should().BeTrue();
            answers.Any(x => x.Key.Equals(RepresentativeQuestionKeys.PresentingTheCase)).Should().BeTrue();
        }

        private List<SuitabilityAnswerResponse> GetAnswersFromBookingsApi()
        {
            var bookingsApiManager = new BookingsApiManager(_c.ServiceWebConfig.VhServices.BookingsApiUrl, _c.Tokens.BookingsApiBearerToken);
            var response = bookingsApiManager.GetSuitabilityAnswers(_c.CurrentUser.Username);
            var answers = RequestHelper.DeserialiseSnakeCaseJsonToResponse<List<PersonSuitabilityAnswerResponse>>(response.Content);
            return answers.First(x => x.Hearing_id.Equals(_c.Test.Hearing.Id)).Answers;
        }

        [Then(@"the self test score is set in the results")]
        public void ThenTheSelfTestScoreIsSetInTheResults()
        {
            var answers = GetAnswersFromBookingsApi();
            var selfTest = answers.First(x => x.Key.Equals(SelfTestQuestionKeys.SelfTestScoreQuestion));
            selfTest.Answer.Should().NotBe("None");
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
