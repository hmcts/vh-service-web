using System;

namespace ServiceWebsite.Domain
{
    public class Hearing
    {
        public Guid Id { get; }
        public string CaseName { get; }
        public string CaseNumber { get; }

        public DateTime ScheduledDateTime { get; }

        public string CaseType { get; }
        
        public string HearingType { get; }

        public Hearing(Guid id, string caseName, string caseNumber, DateTime scheduledDateTime, string caseType, string hearingType)
        {
            Id = id;
            CaseName = caseName;
            CaseNumber = caseNumber;
            ScheduledDateTime = scheduledDateTime;
            CaseType = caseType;
            HearingType = hearingType;
        }
    }
}
