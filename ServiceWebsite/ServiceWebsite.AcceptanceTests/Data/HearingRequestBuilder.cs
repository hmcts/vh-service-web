using System;
using System.Collections.Generic;
using TestApi.Contract.Dtos;
using TestApi.Contract.Enums;
using TestApi.Contract.Requests;

namespace ServiceWebsite.AcceptanceTests.Data
{
    internal class HearingRequestBuilder
    {
        private readonly CreateHearingRequest _request;
        private const string CASE_TYPE = "Generic";
        private const string DEFAULT_VENUE = "Birmingham Civil and Family Justice Centre";
        private const string CACD_CASE_TYPE_NAME = "Court of Appeal Criminal Division";

        public HearingRequestBuilder()
        {
            _request = new CreateHearingRequest()
            {
                Application = Application.ServiceWeb,
                AudioRecordingRequired = false,
                CaseType = CASE_TYPE,
                QuestionnaireNotRequired = false,
                ScheduledDateTime = DateTime.UtcNow.AddHours(1),
                TestType = TestType.Automated,
                Users = new List<UserDto>(),
                Venue = DEFAULT_VENUE
            };
        }

        public HearingRequestBuilder WithUsers(List<UserDto> users)
        {
            _request.Users = users;
            return this;
        }

        public CreateHearingRequest Build()
        {
            return _request;
        }

        public HearingRequestBuilder WithCACDCaseType()
        {
            _request.CaseType = CACD_CASE_TYPE_NAME;
            return this;
        }
    }
}
