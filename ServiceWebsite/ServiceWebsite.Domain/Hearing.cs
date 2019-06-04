using System;

namespace ServiceWebsite.Domain
{
    public class Hearing
    {
        public Guid Id { get; }
        public string CaseName { get; }
        public string CaseNumber { get; }

        public Hearing(Guid id, string caseName, string caseNumber)
        {
            Id = id;
            CaseName = caseName;
            CaseNumber = caseNumber;
        }
    }
}
