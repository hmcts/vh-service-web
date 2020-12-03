using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Threading;
using AcceptanceTests.Common.Api.Helpers;
using AcceptanceTests.Common.Data.Questions;
using FluentAssertions;
using ServiceWebsite.AcceptanceTests.Data;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.Services.TestApi;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public class AnswersSteps
    {
        private const int RETRIES = 5;
        private const int WAIT = 2;
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
            var hearing = HearingData.CreateHearing(_c.Api, _c.Users);
            var answers = new SuitabilityAnswerRequestBuilder().WithDefaultData(_c.WebConfig.TestConfig.TestData).AllAnswers("Representative");
            SubmitAnswers(answers, hearing);
        }

        private void SubmitAnswers(IEnumerable<SuitabilityAnswersRequest> answers, HearingDetailsResponse hearing)
        {
            var participantId = hearing.Participants.First(x => x.Last_name.ToLower().Equals(_c.CurrentUser.Last_name.ToLower())).Id;
            var response = _c.Api.SetSuitabilityAnswers(hearing.Id, participantId, answers);
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
            AnswersHaveBeenSaved().Should().BeFalse();
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
            for (var i = 0; i < RETRIES; i++)
            {
                if (AnswersHaveBeenSaved())
                {
                    var response = _c.Api.GetSuitabilityAnswers(_c.CurrentUser.Username);
                    var answers = RequestHelper.Deserialise<List<PersonSuitabilityAnswerResponse>>(response.Content);
                    var answersResponse = answers.First(x => x.Hearing_id.Equals(_c.Test.Hearing.Id));
                    return answersResponse.Answers;
                }

                Thread.Sleep(TimeSpan.FromSeconds(WAIT));
            }

            throw new DataException($"No answers found after {WAIT * RETRIES} seconds.");
        }

        private bool AnswersHaveBeenSaved()
        {
            var response = _c.Api.GetSuitabilityAnswers(_c.CurrentUser.Username);
            var answers = RequestHelper.Deserialise<List<PersonSuitabilityAnswerResponse>>(response.Content);

            if ( answers == null || !answers.Any(x => x.Hearing_id.Equals(_c.Test.Hearing.Id)))
            {
                return false;
            }

            var answersResponse = answers.First(x => x.Hearing_id.Equals(_c.Test.Hearing.Id));
            return answersResponse.Answers.Count != 0 ;
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
