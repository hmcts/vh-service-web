using System;

namespace ServiceWebsite.Domain
{
    public class Hearing
    {
        public Guid Id { get; }
        public string CaseName { get; }
        public string CaseNumber { get; }

        public DateTime ScheduledDateTime { get; }

        public Hearing(Guid id, string caseName, string caseNumber, DateTime scheduledDateTime)
        {
            Id = id;
            CaseName = caseName;
            CaseNumber = caseNumber;
            ScheduledDateTime = scheduledDateTime;
        }
    }
}
