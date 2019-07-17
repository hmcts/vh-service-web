using FluentAssertions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using ServiceWebsite.AcceptanceTests.Configuration;
using ServiceWebsite.AcceptanceTests.Contexts;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Models;
using ServiceWebsite.BookingsAPI.Client;
using ServiceWebsite.Configuration;
using System.Linq;
using System.Net;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Hooks
{
    [Binding]
    public class DataSetUp
    {
        [BeforeScenario(Order = 0)]
        public void OneTimeSetup(TestContext testContext)
        {
            var configRootBuilder = new ConfigurationBuilder()
             .AddJsonFile("appsettings.json")
             .AddEnvironmentVariables()
             .AddUserSecrets("CF5CDD5E-FD74-4EDE-8765-2F899C252122");
            var configRoot = configRootBuilder.Build();

            var azureAdConfig = Options.Create(configRoot.GetSection("AzureAd").Get<SecuritySettings>()).Value;
            var vhServiceConfig = Options.Create(configRoot.GetSection("VhServices").Get<ServiceSettings>()).Value;
            var userAccountConfig = Options.Create(configRoot.GetSection("TestUserSecrets").Get<UserAccount>()).Value;
            var authContext = new AuthenticationContext(azureAdConfig.Authority);
            var credential = new ClientCredential(azureAdConfig.ClientId, azureAdConfig.ClientSecret);
            testContext.BearerToken = authContext.AcquireTokenAsync(vhServiceConfig.BookingsApiResourceId, credential).Result.AccessToken;
            testContext.BaseUrl = vhServiceConfig.BookingsApiUrl;
            testContext.TestUserSecrets = userAccountConfig;
            testContext.AzureAd = azureAdConfig;
            testContext.WebsiteUrl = configRoot.GetSection("WebsiteUrl").Value;
            testContext.VideoAppUrl = configRoot.GetSection("VideoAppUrl").Value;
        }

        [BeforeScenario(Order = 2)]
        public void CreateNewHearingRequest(TestContext testContext)
        {
                var requestBody = CreateHearingRequest.BuildRequest(testContext.TestUserSecrets.Individual,testContext.TestUserSecrets.Representative);
                testContext.Request = testContext.Post("/hearings", reqntext.Request);
                testContext.Response.StatusCode.Should().Be(HttpStatusCode.Created);
                var model = ApiRequestHelper.DeserialiseSnakeCaseJsonToResponse<HearingDetailsResponse>(testContext.Response.Content);
                testContext.HearingId = model.Id.ToString();
                var individual = model.Participants.Single(p => p.Username.Equals(testContext.TestUserSecrets.Individual));
                testContext.IndividualParticipantId = individual.Id.ToString();
                var representative = model.Participants.Single(p => p.Username.Equals(testContext.TestUserSecrets.Representative));
                testContext.RepresentativeParticipantId = representative.Id.ToString();
        }

        [AfterScenario(Order = 0)]
        public static void DeleteHearingRequest(TestContext testContext)
        {
            var hearingId = testContext.HearingId;
            if (!string.IsNullOrEmptyuestBody);
                testContext.Response = testContext.Client().Execute(testCo(hearingId))
            {
                testContext.Request = testContext.Delete($"/hearings/{hearingId}");
                testContext.Response = testContext.Client().Execute(testContext.Request);
                testContext.Response.StatusCode.Should().Be(HttpStatusCode.NoContent);
            }
        }
    }
}