using System;
using System.Collections.Generic;
using System.Net;
using System.Reflection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using RestSharp;
using ServiceWebsite.AcceptanceTests.Configuration;
using ServiceWebsite.AcceptanceTests.Models;
using ServiceWebsite.AcceptanceTests.TestClients;
using ServiceWebsite.BookingsAPI.Client;
using ServiceWebsite.Configuration;

namespace ServiceWebsite.AcceptanceTests.Helpers
{
    public class BookingsApiClientHelper
    {
        public BookingsApiTestClient CreateClientWithConfig(IConfigurationRoot configRoot)
        {
            var vhServiceConfig = Options.Create(configRoot.GetSection("VhServices").Get<ServiceSettings>()).Value;
            var token = ConfigurationHelper.GetBearerToken(configRoot);
            var client = new RestClient(vhServiceConfig.BookingsApiUrl);
            return new BookingsApiTestClient(client, token);
        }

        public bool CreateNewVideoHearingForCaseParticipants(UserAccount userAccount, IConfigurationRoot configRoot, BookingsApiTestClient client)
        {
            var requestBody = CreateHearingRequest.BuildRequest(userAccount.Individual, userAccount.Representative);
            var statusCode = client.CreateNewVideoHearingsBooking(requestBody);
            return statusCode.Equals(HttpStatusCode.Created);
        }

        public List<HearingDetailsResponse> GetVideoHearingBookingsByIndividualUsernameAsListWithConfig(IConfigurationRoot configRoot, BookingsApiTestClient client)
        {
            var userAccount = Options.Create(configRoot.GetSection("TestUserSecrets").Get<UserAccount>()).Value;
            return client.GetVideoHearingBookingsByUsernameAsList(userAccount.Individual);
        }

        public List<HearingDetailsResponse> GetVideoHearingBookingsByRepresentativeUsernameAsListWithConfig(IConfigurationRoot configRoot, BookingsApiTestClient client)
        {
            var userAccount = Options.Create(configRoot.GetSection("TestUserSecrets").Get<UserAccount>()).Value;
            return client.GetVideoHearingBookingsByUsernameAsList(userAccount.Representative);
        }

        public List<HearingDetailsResponse> GetVideoHearingBookingsForAllParticipants(UserAccount userAccount, BookingsApiTestClient client)
        {
            List<HearingDetailsResponse> videoHearings = client.GetVideoHearingBookingsByUsernameAsList(userAccount.Individual);
            if (videoHearings != null)
            {
                videoHearings.AddRange((IEnumerable<HearingDetailsResponse>)client.GetVideoHearingBookingsByUsernameAsList(userAccount.Representative));
            }
            else
            {
                videoHearings = client.GetVideoHearingBookingsByUsernameAsList(userAccount.Representative);
            }

            return videoHearings;
        }

        public bool DeleteVideoHearingBookingsForAllCaseParticipants(UserAccount userAccount, BookingsApiTestClient client)
        {
            bool success = true;
            List<HearingDetailsResponse> videoHearingsList = GetVideoHearingBookingsForAllParticipants(userAccount, client);

            try
            {
                DeleteVideoHearingBookingsInList(client, videoHearingsList);
            }
            catch (Exception ex)
            {
                success = false;
                TestLogger.Log(MethodBase.GetCurrentMethod().Name,
                    "Exception deleting all video hearings: " + ex.Message);
            }

            return success;
        }

        private static void DeleteVideoHearingBookingsInList(BookingsApiTestClient client, List<HearingDetailsResponse> videoHearings)
        {
            if (videoHearings != null)
            {
                foreach (var videoHearingBooking in videoHearings)
                {
                    client.DeleteVideoHearingBookingForId(videoHearingBooking.Id.ToString());
                }
            }
        }
    }
}
