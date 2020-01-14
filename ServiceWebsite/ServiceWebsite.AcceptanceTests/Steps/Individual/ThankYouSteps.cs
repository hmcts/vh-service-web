using System.Collections.Generic;
using System.Linq;
using AcceptanceTests.Common.Api.Hearings;
using AcceptanceTests.Common.Api.Requests;
using AcceptanceTests.Common.Driver.Browser;
using AcceptanceTests.Common.Test.Steps;
using FluentAssertions;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.BookingsAPI.Client;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps.Individual
{
    [Binding]
    public class ThankYouSteps : ISteps
    {
        private readonly Dictionary<string, UserBrowser> _browsers;
        private readonly TestContext _c;

        public ThankYouSteps(Dictionary<string, UserBrowser> browsers, TestContext testContext)
        {
            _browsers = browsers;
            _c = testContext;
        }

        public void ProgressToNextPage(){}

        [Then(@"answers have been stored")]
        public void ThenAnswersHaveBeenStored()
        {
            var bookingsApiManager = new BookingsApiManager(_c.ServiceWebConfig.VhServices.BookingsApiUrl, _c.Tokens.BookingsApiBearerToken);
            var response = bookingsApiManager.GetSuitabilityAnswers(_c.CurrentUser.Username);
            var answersResponse = RequestHelper.DeserialiseSnakeCaseJsonToResponse<List<PersonSuitabilityAnswerResponse>>(response.Content);
            var answers = answersResponse.First(x => x.Hearing_id.Equals(_c.Test.Hearing.Id)).Answers;
            answers.Count.Should().Be(_c.Test.Answers.Count);
            CheckAnswersMatchStored(answers);
        }

        private void CheckAnswersMatchStored(IEnumerable<SuitabilityAnswerResponse> answers)
        {
            foreach (var answer in answers)
            {
                var expectedAnswer = _c.Test.Answers.First(x => x.QuestionKey.Equals(answer.Key));

                if (answer.Answer.Equals("true"))
                {
                    expectedAnswer.Answer.Should().Be("Yes");
                }
                else if (answer.Answer.Equals("false"))
                {
                    expectedAnswer.Answer.Should().Be("No");
                }
                else
                {
                    expectedAnswer.Answer.Should().Be(answer.Answer);
                }

                expectedAnswer.ExtendedAnswer.Should().Be(answer.Extended_answer);
            }
        }
    }
}
