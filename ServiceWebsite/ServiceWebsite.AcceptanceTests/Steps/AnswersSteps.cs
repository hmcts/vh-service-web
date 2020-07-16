using System.Collections.Generic;
using System.Linq;
using System.Net;
using AcceptanceTests.Common.Api.Helpers;
using AcceptanceTests.Common.Data.Questions;
using FluentAssertions;
using ServiceWebsite.AcceptanceTests.Data;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.BookingsAPI.Client;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public class AnswersSteps
    {
        private readonly TestContext _c;

        public AnswersSteps(TestContext testContext)
        {
            _c = testContext;
        }

        [Given(@"(.*) has already submitted checklist and self test")]
        public void UserHasAlreadySubmittedChecklistAndSelfTest(string user)
        {
            var answers = new SuitabilityAnswerRequestBuilder().WithDefaultData(_c.WebConfig.TestConfig.TestData).AllAnswers(user);
            SubmitAnswers(answers, _c.Test.Hearing);
        }

        [Given(@"(.*) has already submitted checklist")]
        public void GivenIndividualHasAlreadySubmittedChecklist(string user)
        {
            var answers = new SuitabilityAnswerRequestBuilder().WithDefaultData(_c.WebConfig.TestConfig.TestData).ChecklistAnswersOnly(user);
            SubmitAnswers(answers, _c.Test.Hearing);
        }

        [Given(@"Representative has already submitted checklist and self test on a previous hearing")]
        public void GivenRepresentativeHasAlreadySubmittedChecklistAndSelfTestOnAPreviousHearing()
        {
            var hearing = new HearingData(_c.Apis.BookingsApi).CreateHearing(_c.UserAccounts);
            var answers = new SuitabilityAnswerRequestBuilder().WithDefaultData(_c.WebConfig.TestConfig.TestData).AllAnswers("Representative");
            SubmitAnswers(answers, hearing);
        }

        private void SubmitAnswers(IEnumerable<SuitabilityAnswersRequest> answers, HearingDetailsResponse hearing)
        {
            var participantId = hearing.Participants.First(x => x.Last_name.ToLower().Equals(_c.CurrentUser.Lastname.ToLower())).Id;
            var response = _c.Apis.BookingsApi.SetSuitabilityAnswers(hearing.Id, participantId, answers);
            response.StatusCode.Should().Be(HttpStatusCode.NoContent);
        }

        [Then(@"the answers have been stored")]
        public void ThenAnswersHaveBeenStored()
        {
            var answers = GetAnswersFromBookingsApi();
            answers.Count.Should().BeGreaterThan(0);
            answers.Count.Should().Be(_c.Test.Answers.Count);
            new VerifyAnswersMatch().Expected(_c.Test.Answers).Actual(answers);
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
            var response = _c.Apis.BookingsApi.GetSuitabilityAnswers(_c.CurrentUser.Username);
            var answers = RequestHelper.DeserialiseSnakeCaseJsonToResponse<List<PersonSuitabilityAnswerResponse>>(response.Content);
            return answers.First(x => x.Hearing_id.Equals(_c.Test.Hearing.Id)).Answers;
        }

        [Then(@"the self test score is set in the results")]
        public void ThenTheSelfTestScoreIsSetInTheResults()
        {
            var answers = GetAnswersFromBookingsApi();
            answers.Any(x => x.Key.Equals(SelfTestQuestionKeys.SelfTestScoreQuestion)).Should().BeTrue();
            var selfTest = answers.First(x => x.Key.Equals(SelfTestQuestionKeys.SelfTestScoreQuestion));
            selfTest.Answer.Should().NotBe("None");
        }
    }
}
