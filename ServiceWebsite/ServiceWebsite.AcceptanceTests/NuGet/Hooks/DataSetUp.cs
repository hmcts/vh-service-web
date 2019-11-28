using System;
using System.Collections.Generic;
using ServiceWebsite.BookingsAPI.Client;
using ServiceWebsite.Configuration;
using FluentAssertions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using System.Net;
using TechTalk.SpecFlow;
using ServiceWebsite.AcceptanceTests.NuGet.Configuration;
using ServiceWebsite.AcceptanceTests.NuGet.Contexts;
using ServiceWebsite.AcceptanceTests.NuGet.Helpers;
using ServiceWebsite.Common;
using ServiceWebsite.AcceptanceTests.NuGet.Builders;
using System.Linq;

namespace ServiceWebsite.AcceptanceTests.NuGet.Hooks
{
    [Binding]
    public class DataSetUp
    {
        private const string ServiceWebSecret = "CF5CDD5E-FD74-4EDE-8765-2F899C252122";

       [BeforeScenario(Order = 0)]
        // Service web only
        public void OneTimeSetup(TestContextBase testContext)
        {
            var configRootBuilder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .AddJsonFile("useraccounts.json")
                .AddEnvironmentVariables()
                .AddUserSecrets(ServiceWebSecret);
            var configRoot = configRootBuilder.Build();

            var azureAdConfig = Options.Create(configRoot.GetSection("AzureAd").Get<SecuritySettings>()).Value;
            var vhServiceConfig = Options.Create(configRoot.GetSection("VhServices").Get<ServiceSettings>()).Value;
            var testSecrets = Options.Create(configRoot.GetSection("TestUserSecrets").Get<TestSettings>()).Value;
            var testAccounts = Options.Create(configRoot.GetSection("UserAccounts").Get<List<UserAccount>>()).Value;
            var authContext = new AuthenticationContext(azureAdConfig.Authority);
            var credential = new ClientCredential(azureAdConfig.ClientId, azureAdConfig.ClientSecret);

            testSecrets.TestUsernameStem.Should().NotBeNullOrEmpty("TestUsernameStem should not be empty.");
            testSecrets.TestUserPassword.Should().NotBeNullOrEmpty("TestUserPassword should not be empty.");
            testAccounts.Count.Should().BeGreaterThan(0, "The count of test accounts should be greater than 0");
            vhServiceConfig.BookingsApiUrl.Should().NotBeNullOrEmpty("BookingsApiUrl should not be empty.");

            testContext.BookingsApiBearerToken = authContext.AcquireTokenAsync(vhServiceConfig.BookingsApiResourceId, credential).Result.AccessToken;
            testContext.BookingsApiBaseUrl = vhServiceConfig.BookingsApiUrl;

            testContext.TestUserSecrets = testSecrets;
            testContext.UserAccounts = testAccounts;
            testContext.AzureAd = azureAdConfig;

            testContext.WebsiteUrl = configRoot.GetSection("WebsiteUrl").Value;
            testContext.VideoAppUrl = configRoot.GetSection("VideoAppUrl").Value;

            foreach (var user in testContext.UserAccounts)
            {
                user.Username = $"{user.Displayname}{testSecrets.TestUsernameStem}";
            }
        }

        [BeforeScenario(Order = 1)]
        public void CheckApisHealth(TestContextBase testContext)
        {
            CheckBookingsApiHealth(testContext);
        }

        public static void CheckBookingsApiHealth(TestContextBase testContext)
        {
            var endpoint = new BookingsApiUriFactory().HealthCheckEndpoints;
            testContext.Request = testContext.Get(endpoint.HealthCheck);
            testContext.Response = testContext.BookingsApiClient().Execute(testContext.Request);
            testContext.Response.StatusCode.Should().Be(HttpStatusCode.OK, "Unable to connect to the Bookings Api");
        }

        [BeforeScenario(Order = 2)]
        public static void ClearAnyHearings(TestContextBase testContext, HearingsEndpoints endpoints)
        {
            ClearHearings(testContext, endpoints, testContext.GetIndividualUsers());
            ClearHearings(testContext, endpoints, testContext.GetRepresentativeUsers());
        }

        private static void ClearHearings(TestContextBase testContext, HearingsEndpoints endpoints, IEnumerable<Configuration.UserAccount> users)
        {
            foreach (var user in users)
            {
                testContext.Request = testContext.Get(endpoints.GetHearingsByUsername(user.Username));
                testContext.Response = testContext.BookingsApiClient().Execute(testContext.Request);
                var hearings =
                    ApiRequestHelper.DeserialiseSnakeCaseJsonToResponse<List<HearingDetailsResponse>>(testContext.Response
                        .Content);
                foreach (var hearing in hearings)
                {
                    testContext.Request = testContext.Delete(endpoints.RemoveHearing(hearing.Id));
                    testContext.Response = testContext.BookingsApiClient().Execute(testContext.Request);
                }
            }
        }

        [BeforeScenario(Order = 3)]
        public void CreateNewHearingRequest(TestContextBase testContext, HearingsEndpoints endpoints)
        {
            var requestBody = new HearingRequestBuilder().WithContext(testContext).Build();
            testContext.Request = testContext.Post(endpoints.BookNewHearing(), requestBody);
            testContext.Response = testContext.BookingsApiClient().Execute(testContext.Request);
            testContext.Response.StatusCode.Should().Be(HttpStatusCode.Created);
            var model = ApiRequestHelper.DeserialiseSnakeCaseJsonToResponse<HearingDetailsResponse>(testContext.Response.Content);
            testContext.HearingId = (Guid)model.Id;
            var individual = model.Participants.First(p => p.Username.StartsWith(testContext.GetIndividualUser().Username));
            testContext.GetIndividualUser().Id = (Guid)individual.Id;
            var representative = model.Participants.First(p => p.Username.StartsWith(testContext.GetRepresentativeUser().Username));
            testContext.GetRepresentativeUser().Id = (Guid)representative.Id;
        }

        [AfterScenario(Order = 1)]
        public static void RemoveHearing(TestContextBase testContext, HearingsEndpoints endpoints)
        {
            if (testContext.HearingId == Guid.Empty) return;
            testContext.Request = testContext.Delete(endpoints.RemoveHearing(testContext.HearingId));
            testContext.Response = testContext.BookingsApiClient().Execute(testContext.Request);
            testContext.Response.IsSuccessful.Should().BeTrue("New hearing should have been deleted after the test");
            testContext.HearingId = Guid.Empty;
        }
    }
}
