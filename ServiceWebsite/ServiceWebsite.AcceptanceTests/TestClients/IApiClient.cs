using RestSharp;

namespace ServiceWebsite.AcceptanceTests.TestClients
{
    public interface IApiClient
    {
        RestRequest Delete(string path);
        RestRequest Get(string path);
        RestRequest Post(string path, object requestBody);
        RestRequest Put(string path, object requestBody);
    }
}