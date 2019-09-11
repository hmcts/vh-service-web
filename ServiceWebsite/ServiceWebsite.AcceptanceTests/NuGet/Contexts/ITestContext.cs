using System;
using System.Collections.Generic;
using RestSharp;
using ServiceWebsite.AcceptanceTests.NuGet.Configuration;
using ServiceWebsite.BookingsAPI.Client;
using ServiceWebsite.Configuration;

namespace ServiceWebsite.AcceptanceTests.NuGet.Contexts
{
    public interface ITestContext
    {
        string WebsiteUrl { get; set; }
        string RedirectUrl { get; set; }
        string BookingsApiBearerToken { get; set; }
        string BookingsApiBaseUrl { get; set; }
        RestRequest Request { get; set; }
        BookNewHearingRequest HearingRequest { get; set; }
        IRestResponse Response { get; set; }
        SecuritySettings AzureAd { get; set; }
        TestSettings TestUserSecrets { get; set; }
        List<UserAccount> UserAccounts { get; set; }
        UserAccount CurrentUser { get; set; }
        Guid HearingId { get; set; }

        UserAccount GetClerkUser();
        UserAccount GetIndividualUser();
        UserAccount GetRepresentativeUser();
        UserAccount GetCaseAdminUser();
        UserAccount GetNonAdminUser();
        IEnumerable<UserAccount> GetCaseAdminUsers();
        IEnumerable<UserAccount> GetIndividualUsers();
        IEnumerable<UserAccount> GetRepresentativeUsers();

        RestClient BookingsApiClient();
        RestRequest Get(string path);
        RestRequest Post(string path, object requestBody);
        RestRequest Put(string path, object requestBody);
    }
}