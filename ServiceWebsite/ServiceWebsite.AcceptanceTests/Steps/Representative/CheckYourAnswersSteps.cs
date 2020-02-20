using System.Collections.Generic;
using System.Linq;
using AcceptanceTests.Common.Data.Helpers;
using AcceptanceTests.Common.Data.Questions;
using AcceptanceTests.Common.Driver.Browser;
using AcceptanceTests.Common.Driver.Helpers;
using AcceptanceTests.Common.Test.Steps;
using FluentAssertions;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Pages.Representative;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps.Representative
{
    [Binding]
    public class CheckYourAnswersSteps : ISteps
    {
        private readonly Dictionary<string, UserBrowser> _browsers;
        private readonly TestContext _c;
        private readonly PresentingTheCaseSteps _presentingTheCaseSteps;
        private readonly OtherInformationSteps _otherInformationSteps;
        public CheckYourAnswersSteps(Dictionary<string, UserBrowser> browsers, TestContext testContext, PresentingTheCaseSteps presentingTheCaseSteps, OtherInformationSteps otherInformationSteps)
        {
            _browsers = browsers;
            _c = testContext;
            _presentingTheCaseSteps = presentingTheCaseSteps;
            _otherInformationSteps = otherInformationSteps;
        }

        [When(@"the user changes who'll be presenting")]
        public void WhenTheUserChangesWhoLlBePresenting()
        {
            _browsers[_c.CurrentUser.Key].ClickLink(CheckYourAnswersPage.ChangePresenterLink);
            RemovePreviousAnswer(RepresentativeQuestionKeys.PresentingTheCase);
            _presentingTheCaseSteps.WhenTheUserSelectsSomeoneElseToPresent();
            _browsers[_c.CurrentUser.Key].Click(PresentingTheCasePage.ContinueButton);
        }

        [When(@"the user changes the other information")]
        public void WhenTheUserChangesTheOtherInformation()
        {
            _browsers[_c.CurrentUser.Key].ClickLink(CheckYourAnswersPage.ChangeOtherInformationLink);
            RemovePreviousAnswer(RepresentativeQuestionKeys.OtherInformation);
            _otherInformationSteps.WhenTheUserEntersMoreDetailsIntoThePleaseProvideMoreInformationTextfield();
            _browsers[_c.CurrentUser.Key].Click(OtherInformationPage.ContinueButton);
        }

        [Then(@"the answer for who'll be presenting is displayed correctly")]
        public void ThenTheAnswerForWhoLlBePresentingIsDisplayedCorrectly()
        {
            var answer = _c.Test.Answers.First(x => x.QuestionKey.Equals(RepresentativeQuestionKeys.PresentingTheCase));
            if (answer.Answer.Equals(_c.ServiceWebConfig.TestConfig.TestData.PresentingTheCase.Answer))
            {
                _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(CheckYourAnswersPage.PresentingAnswerText)
                    .Text.Trim().Should().Be(_c.Test.Answers.First(x => x.QuestionKey.Equals(RepresentativeQuestionKeys.PresentingTheCase)).Answer);
            }
            else
            {
                _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(CheckYourAnswersPage.FullName)
                    .Text.Trim().Should().Be(_c.ServiceWebConfig.TestConfig.TestData.PresentingTheCase.WhoWillBePresentingName);
                _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(CheckYourAnswersPage.Email)
                    .Text.Trim().Should().Be(_c.ServiceWebConfig.TestConfig.TestData.PresentingTheCase.WhoWillBePresentingEmail);
            }
        }

        [Then(@"the answer for other information is displayed correctly")]
        public void ThenTheAnswerForOtherInformationIsDisplayedCorrectly()
        {
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(CheckYourAnswersPage.OtherInformationAnswer)
                .Text.Trim().Should().Be(_c.Test.Answers.First(x => x.QuestionKey.Equals(RepresentativeQuestionKeys.OtherInformation)).Answer);
            _browsers[_c.CurrentUser.Key].Driver.WaitUntilVisible(CheckYourAnswersPage.OtherInformationText)
                .Text.Trim().Should().Be(CustomConverters.NullToString(_c.Test.Answers.First(x => x.QuestionKey.Equals(RepresentativeQuestionKeys.OtherInformation)).ExtendedAnswer));
        }

        public void ProgressToNextPage()
        {
            _browsers[_c.CurrentUser.Key].Click(CheckYourAnswersPage.ContinueButton);
        }

        private void RemovePreviousAnswer(string questionKey)
        {
            var previousAnswer = _c.Test.Answers.First(x => x.QuestionKey.Equals(questionKey));
            _c.Test.Answers.Remove(previousAnswer);
        }
    }
}
