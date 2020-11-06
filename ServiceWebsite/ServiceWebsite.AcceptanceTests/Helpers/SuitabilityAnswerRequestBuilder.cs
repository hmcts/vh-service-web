using System.Collections.Generic;
using System.Linq;
using AcceptanceTests.Common.Data.Questions;
using ServiceWebsite.AcceptanceTests.Data.TestData;
using ServiceWebsite.Services.TestApi;

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
            return user.ToLower().Equals("individual")
                ? SelfTestAnswers().ToList()
                : RepChecklistAnswers().Union(SelfTestAnswers()).ToList();
        }

        public IEnumerable<SuitabilityAnswersRequest> ChecklistAnswersOnly(string user)
        {
            return user.ToLower().Equals("individual") ? new List<SuitabilityAnswersRequest>() : RepChecklistAnswers();
        }

        private IEnumerable<SuitabilityAnswersRequest> RepChecklistAnswers()
        {
            var answers = new List<SuitabilityAnswersRequest>
            {
                new SuitabilityAnswersRequest
                {
                    Key = RepresentativeQuestionKeys.PresentingTheCase, Extended_answer = null,
                    Answer = _data.PresentingTheCase.Answer
                },
                new SuitabilityAnswersRequest
                {
                    Key = RepresentativeQuestionKeys.OtherInformation, Extended_answer = null,
                    Answer = _data.OtherInformation.Answer
                }
            };
            return UpdateYesNoToTrueFalse(answers);
        }

        private IEnumerable<SuitabilityAnswersRequest> SelfTestAnswers()
        {
            var answers = new List<SuitabilityAnswersRequest>
            {
                new SuitabilityAnswersRequest
                {
                    Key = SelfTestQuestionKeys.CheckYourComputerQuestion, Extended_answer = null,
                    Answer = _data.CheckYourComputer
                },
                new SuitabilityAnswersRequest
                {
                    Key = SelfTestQuestionKeys.MicrophoneQuestion, Extended_answer = null,
                    Answer = _data.MicrophoneWorking
                },
                new SuitabilityAnswersRequest
                    {Key = SelfTestQuestionKeys.SeeVideoQuestion, Extended_answer = null, Answer = _data.VideoWorking},
                new SuitabilityAnswersRequest
                {
                    Key = SelfTestQuestionKeys.SeeYourselfQuestion, Extended_answer = null, Answer = _data.CameraWorking
                },
                new SuitabilityAnswersRequest
                {
                    Key = SelfTestQuestionKeys.SelfTestScoreQuestion, Extended_answer = null,
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
