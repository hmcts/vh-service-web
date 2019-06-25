using System;
using System.Collections.Generic;
using System.Text;

namespace ServiceWebsite.AcceptanceTests.Helpers
{
    public class SuitabilityResponse
    {
        public string Page { get; set; }
        public AnswerType Answer { get; set; }
        public string Details { get; set; }
        public string QuestionKey { get; set; }
    }
}
