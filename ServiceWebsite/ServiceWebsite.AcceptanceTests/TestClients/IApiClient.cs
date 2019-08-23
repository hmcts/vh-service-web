using RestSharp;

namespace ServiceWebsite.AcceptanceTests.Clients
{
    public interface IApiClient
    {
        RestClient Client { get; }
        RestRequest Delete(string path);
        RestRequest Get(string path);
        RestRequest Post(string path, object requestBody);
        RestRequest Put(string path, object requestBody);
    }
}