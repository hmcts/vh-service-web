using RestSharp;
using ServiceWebsite.AcceptanceTests.Configuration;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.Configuration;

namespace ServiceWebsite.AcceptanceTests.Contexts
{
    public class TestContext
    {
        public RestRequest Request { get; set; }
        public IRestResponse Response { get; set; }
        public string BearerToken { get; set; }
        public string BaseUrl { get; set; }
        public string Json { get; set; }
        public string HearingId { get; set; }
        public UserAccount TestUserSecrets { get; set; }
        public SecuritySettings AzureAd { get; set; }
        public string WebsiteUrl { get; set; }

        public RestClient Client()
        {
            var client = new RestClient(BaseUrl);
            client.AddDefaultHeader("Accept", "application/json");
            client.AddDefaultHeader("Authorization", $"Bearer {BearerToken}");
            return client;
        }

        public RestRequest Get(string path) => new RestRequest(path, Method.GET);

        public RestRequest Post(string path, object requestBody)
        {
            var request = new RestRequest(path, Method.POST);
            request.AddParameter("Application/json", ApiRequestHelper.SerialiseRequestToSnakeCaseJson(requestBody),
                ParameterType.RequestBody);
            return request;
        }

        public RestRequest Delete(string path) => new RestRequest(path, Method.DELETE);
    }
}