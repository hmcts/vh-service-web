namespace ServiceWebsite.Domain
{
    public class Hearing
    {
        public long Id { get; }
        public string CaseName { get; }
        public string CaseNumber { get; }

        public Hearing(long id, string caseName, string caseNumber)
        {
            Id = id;
            CaseName = caseName;
            CaseNumber = caseNumber;
        }
    }
}
