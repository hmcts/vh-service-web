using System.Collections.Generic;
using System.Linq;
using AcceptanceTests.Common.Data.Questions;
using ServiceWebsite.AcceptanceTests.Data.TestData;
using ServiceWebsite.BookingsAPI.Client;

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
            return user.ToLower().Equals("individual") ? IndividualChecklistAnswers().Union(SelfTestAnswers()).ToList() : RepChecklistAnswers().Union(SelfTestAnswers()).ToList();
        }
        public IEnumerable<SuitabilityAnswersRequest> ChecklistAnswersOnly(string user)
        {
            return user.ToLower().Equals("individual") ? IndividualChecklistAnswers() : RepChecklistAnswers();
        }

        private IEnumerable<SuitabilityAnswersRequest> IndividualChecklistAnswers()
        {
            return new List<SuitabilityAnswersRequest>
            {
                new SuitabilityAnswersRequest{ Key = IndividualQuestionKeys.AboutYouQuestion, Extended_answer = null, Answer = _data.AboutYou.Answer },
                new SuitabilityAnswersRequest{ Key = IndividualQuestionKeys.CameraMicrophoneQuestion, Extended_answer = null, Answer = _data.VideoWorking },
                new SuitabilityAnswersRequest{ Key = IndividualQuestionKeys.ComputerQuestion, Extended_answer = null, Answer = _data.YourComputer },
                new SuitabilityAnswersRequest{ Key = IndividualQuestionKeys.ConsentQuestion, Extended_answer = null, Answer = _data.Consent.Answer },
                new SuitabilityAnswersRequest{ Key = IndividualQuestionKeys.InternetQuestion, Extended_answer = null, Answer = _data.InternetConnection },
                new SuitabilityAnswersRequest{ Key = IndividualQuestionKeys.InterpreterQuestion, Extended_answer = null, Answer = _data.Interpreter },
                new SuitabilityAnswersRequest{ Key = IndividualQuestionKeys.RoomQuestion, Extended_answer = null, Answer = _data.AccessToRoom }
            };
        }

        private IEnumerable<SuitabilityAnswersRequest> RepChecklistAnswers()
        {
            return new List<SuitabilityAnswersRequest>
            {
                new SuitabilityAnswersRequest{ Key = RepresentativeQuestionKeys.PresentingTheCase, Extended_answer = null, Answer = _data.PresentingTheCase.Answer },
                new SuitabilityAnswersRequest{ Key = RepresentativeQuestionKeys.OtherInformation, Extended_answer = null, Answer = _data.OtherInformation.Answer }
            };
        }

        private IEnumerable<SuitabilityAnswersRequest> SelfTestAnswers()
        {
            return new List<SuitabilityAnswersRequest>
            {
                new SuitabilityAnswersRequest{ Key = SelfTestQuestionKeys.CheckYourComputerQuestion, Extended_answer = null, Answer = _data.CheckYourComputer },
                new SuitabilityAnswersRequest{ Key = SelfTestQuestionKeys.MicrophoneQuestion, Extended_answer = null, Answer = _data.MicrophoneWorking },
                new SuitabilityAnswersRequest{ Key = SelfTestQuestionKeys.SeeVideoQuestion, Extended_answer = null, Answer = _data.VideoWorking },
                new SuitabilityAnswersRequest{ Key = SelfTestQuestionKeys.SeeYourselfQuestion, Extended_answer = null, Answer = _data.CameraWorking },
                new SuitabilityAnswersRequest{ Key = SelfTestQuestionKeys.SelfTestScoreQuestion, Extended_answer = null, Answer = _data.SelfTestScore },
            };
        }
    }
}
