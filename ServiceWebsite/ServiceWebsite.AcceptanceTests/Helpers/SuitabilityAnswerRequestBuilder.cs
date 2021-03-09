using System.Collections.Generic;
using System.Linq;
using AcceptanceTests.Common.Data.Questions;
using BookingsApi.Contract.Requests;
using ServiceWebsite.AcceptanceTests.Data.TestData;

namespace ServiceWebsite.AcceptanceTests.Helpers
{
    public class SuitabilityAnswerRequestBuilder
    {
        private DefaultData _data;

        public SuitabilityAnswerRequestBuilder WithDefaultData(DefaultData data)
        {
            _data = data;
            return this;
        }

        public List<SuitabilityAnswersRequest> AllAnswers(string user)
        {
            return SelfTestAnswers().ToList();
        }

        public IEnumerable<SuitabilityAnswersRequest> ChecklistAnswersOnly(string user)
        {
            return new List<SuitabilityAnswersRequest>();
        }


        private IEnumerable<SuitabilityAnswersRequest> SelfTestAnswers()
        {
            var answers = new List<SuitabilityAnswersRequest>
            {
                new SuitabilityAnswersRequest
                {
                    Key = SelfTestQuestionKeys.CheckYourComputerQuestion, ExtendedAnswer = null,
                    Answer = _data.CheckYourComputer
                },
                new SuitabilityAnswersRequest
                {
                    Key = SelfTestQuestionKeys.MicrophoneQuestion, ExtendedAnswer = null,
                    Answer = _data.MicrophoneWorking
                },
                new SuitabilityAnswersRequest
                    {Key = SelfTestQuestionKeys.SeeVideoQuestion, ExtendedAnswer = null, Answer = _data.VideoWorking},
                new SuitabilityAnswersRequest
                {
                    Key = SelfTestQuestionKeys.SeeYourselfQuestion, ExtendedAnswer = null, Answer = _data.CameraWorking
                },
                new SuitabilityAnswersRequest
                {
                    Key = SelfTestQuestionKeys.SelfTestScoreQuestion, ExtendedAnswer = null,
                    Answer = _data.SelfTestScore
                },
            };
            return UpdateYesNoToTrueFalse(answers);
        }

        private static IEnumerable<SuitabilityAnswersRequest> UpdateYesNoToTrueFalse(List<SuitabilityAnswersRequest> yesNoAnswers)
        {
            var answers = yesNoAnswers;
            foreach (var answer in answers)
            {
                if (answer.Answer.Equals("Yes"))
                    answer.Answer = "true";

                if (answer.Answer.Equals("No"))
                    answer.Answer = "false";
            }

            return answers;
        }
    }
}
