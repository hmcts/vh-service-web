namespace ServiceWebsite.AcceptanceTests.Helpers
{

    public class ApiUriFactory
    {
        public ApiUriFactory()
        {
            HearingEndpoints = new HearingEndpoints();
        }

        public HearingEndpoints HearingEndpoints { get; set; }
    }

    public class HearingEndpoints
    {
        private string ApiRoot => "/hearings";
        public string BookNewHearing => ApiRoot;
        public string RemoveHearing(string hearingId) => $"{ApiRoot}/{hearingId}";
    }
}