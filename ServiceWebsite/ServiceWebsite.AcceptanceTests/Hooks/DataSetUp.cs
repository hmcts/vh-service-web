using FluentAssertions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using ServiceWebsite.AcceptanceTests.Configuration;
using ServiceWebsite.AcceptanceTests.Contexts;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Models;
using ServiceWebsite.BookingsAPI.Client;
using ServiceWebsite.Common;
using ServiceWebsite.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Reflection;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Hooks
{
    [Binding]
    public class DataSetUp
    {
		[BeforeScenario(Order = 0)]
        public void OneTimeSetup(TestContext testContext)
        {
            var configRoot = ConfigurationHelper.BuildDefaultConfigRoot();

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
        public static void ClearAnyHearings(TestContext context)
        {
            ClearHearings(context, context.TestUserSecrets.Individual);
            ClearHearings(context, context.TestUserSecrets.Representative);
        }

        private static void ClearHearings(TestContext context, string userName)
        {
            var request = context.Get($"/hearings/?username={userName}");
            var response = context.Client().Execute(request);
            var hearings = ApiRequestHelper.DeserialiseSnakeCaseJsonToResponse<List<HearingDetailsResponse>>(response.Content);

            if (hearings == null || !response.IsSuccessful)
            {
                TestLogger.Log(Assembly.GetCallingAssembly().GetName().FullName, "No hearings to clear");
                return;
            }
            foreach (var hearing in hearings)
            {
                DeleteHearing(context, hearing.Id.ToString());
                context.Response.IsSuccessful.Should().BeTrue($"Hearing {hearing.Id} has been deleted");
            }
        }

        [BeforeScenario(Order = 3)]
        public void CreateNewHearingRequest(TestContext testContext)
        {
            var requestBody = CreateHearingRequest.BuildRequest(testContext.TestUserSecrets.Individual, testContext.TestUserSecrets.Representative);
            testContext.Request = testContext.Post("/hearings", requestBody);
            testContext.Response = testContext.Client().Execute(testContext.Request);
            testContext.Response.StatusCode.Should().Be(HttpStatusCode.Created, "Create new hearing Response Status should have been Created");
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
            if (!string.IsNullOrEmpty(hearingId))
            {
                DeleteHearing(testContext, hearingId);
            }
        }

        private static void DeleteHearing(TestContext testContext, string hearingId)
        {
            testContext.Request = testContext.Delete($"/hearings/{hearingId}");
            testContext.Response = testContext.Client().Execute(testContext.Request);
            testContext.Response.StatusCode.Should().Be(HttpStatusCode.NoContent);
        }
    }
}