using System;
using System.Collections.Generic;
using System.Linq;
using BoDi;
using RestSharp;
using ServiceWebsite.AcceptanceTests.NuGet.Configuration;
using ServiceWebsite.BookingsAPI.Client;
using ServiceWebsite.Common;
using ServiceWebsite.Configuration;

namespace ServiceWebsite.AcceptanceTests.NuGet.Contexts
{
    public class TestContextBase : ITestContext
    {
        public string BaseUrl { get; set; }
        public string RedirectUrl { get; set; }
        public string BookingsApiBearerToken { get; set; }
        public string BookingsApiBaseUrl { get; set; }
        public RestRequest Request { get; set; }
        public BookNewHearingRequest HearingRequest { get; set; }
        public IRestResponse Response { get; set; }
        public SecuritySettings AzureAd { get; set; }
        public TestSettings TestUserSecrets { get; set; }
        public List<UserAccount> UserAccounts { get; set; }
        public UserAccount CurrentUser { get; set; }
        public Guid HearingId { get; set; }

        public RestRequest Get(string path) => new RestRequest(path, Method.GET);

        public RestRequest Post(string path, object requestBody)
        {
            var request = new RestRequest(path, Method.POST);
            request.AddParameter("Application/json", ApiRequestHelper.SerialiseRequestToSnakeCaseJson(requestBody),
                ParameterType.RequestBody);
            return request;
        }

        public RestRequest Put(string path, object requestBody)
        {
            var request = new RestRequest(path, Method.PUT);
            request.AddParameter("Application/json", ApiRequestHelper.SerialiseRequestToSnakeCaseJson(requestBody),
                ParameterType.RequestBody);
            return request;
        }

        public RestRequest Delete(string path) => new RestRequest(path, Method.DELETE);

        public RestClient BookingsApiClient()
        {
            var client = new RestClient(BookingsApiBaseUrl);
            client.AddDefaultHeader("Accept", "application/json");
            client.AddDefaultHeader("Authorization", $"Bearer {BookingsApiBearerToken}");
            return client;
        }
        public UserAccount GetClerkUser()
        {
            return UserAccounts.First(x => x.Role.StartsWith("Clerk"));
        }

        public UserAccount GetCaseAdminUser()
        {
            return UserAccounts.First(x => x.Role.StartsWith("Case admin"));
        }

        public UserAccount GetNonAdminUser()
        {
            return GetIndividualUser();
        }

        public IEnumerable<UserAccount> GetCaseAdminUsers()
        {
            return UserAccounts.Where(x => x.Role.StartsWith("Case admin")).ToList();
        }

        public UserAccount GetIndividualUser()
        {
            return UserAccounts.First(x => x.Role.StartsWith("Individual"));
        }

        public UserAccount GetRepresentativeUser()
        {
            return UserAccounts.First(x => x.Role.StartsWith("Representative"));
        }

        public IEnumerable<UserAccount> GetIndividualUsers()
        {
            return UserAccounts.Where(x => x.Role.StartsWith("Individual")).ToList();
        }

        public IEnumerable<UserAccount> GetRepresentativeUsers()
        {
            return UserAccounts.Where(x => x.Role.StartsWith("Representative")).ToList();
        }
    }
}
