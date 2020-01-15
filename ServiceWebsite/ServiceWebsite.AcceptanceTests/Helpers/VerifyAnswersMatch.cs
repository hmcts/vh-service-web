using System.Collections.Generic;
using System.Linq;
using FluentAssertions;
using ServiceWebsite.AcceptanceTests.Data;
using ServiceWebsite.BookingsAPI.Client;

namespace ServiceWebsite.AcceptanceTests.Helpers
{
    public class VerifyAnswersMatch
    {
        private List<SuitabilityAnswer> _expectedAnswers;

        public VerifyAnswersMatch Expected(List<SuitabilityAnswer> expectedAnswers)
        {
            _expectedAnswers = expectedAnswers;
            return this;
        }

        public void Actual(IEnumerable<SuitabilityAnswerResponse> actualAnswers)
        {
            foreach (var actual in actualAnswers)
            {
                var expected = _expectedAnswers.First(x => x.QuestionKey.Equals(actual.Key));

                if (actual.Answer.Equals("true"))
                {
                    expected.Answer.Should().Be("Yes");
                }
                else if (actual.Answer.Equals("false"))
                {
                    expected.Answer.Should().Be("No");
                }
                else
                {
                    expected.Answer.Should().Be(actual.Answer);
                }

                expected.ExtendedAnswer.Should().Be(actual.Extended_answer);
            }
        }
    }
}
