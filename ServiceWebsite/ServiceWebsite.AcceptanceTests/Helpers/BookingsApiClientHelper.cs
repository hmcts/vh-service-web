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

namespace ServiceWebsite.AcceptanceTests.Helpers
{
    public class BookingsApiClientHelper
    {
        public BookingsApiTestClient Client { get; set; }

        public void CreateClient(RestClient restClient, string token)
        {
            Client = new BookingsApiTestClient(restClient, token);
        }

        public bool CreateNewVideoHearingForCaseParticipants(UserAccount userAccount)
        {
            var requestBody = CreateHearingRequest.BuildRequest(userAccount.Individual, userAccount.Representative);
            var statusCode = Client.CreateNewVideoHearingsBooking(requestBody);
            return statusCode.Equals(HttpStatusCode.Created);
        }

        public List<HearingDetailsResponse> GetVideoHearingBookingsByIndividualUsernameAsListWithConfig(IConfigurationRoot configRoot)
        {
            var userAccount = Options.Create(configRoot.GetSection("TestUserSecrets").Get<UserAccount>()).Value;
            return Client.GetVideoHearingBookingsByUsernameAsList(userAccount.Individual);
        }

        public List<HearingDetailsResponse> GetVideoHearingBookingsByRepresentativeUsernameAsListWithConfig(IConfigurationRoot configRoot)
        {
            var userAccount = Options.Create(configRoot.GetSection("TestUserSecrets").Get<UserAccount>()).Value;
            return Client.GetVideoHearingBookingsByUsernameAsList(userAccount.Representative);
        }

        public List<HearingDetailsResponse> GetVideoHearingBookingsForAllParticipants(UserAccount userAccount)
        {
            List<HearingDetailsResponse> videoHearings = Client.GetVideoHearingBookingsByUsernameAsList(userAccount.Individual);
            if (videoHearings != null)
            {
                videoHearings.AddRange(Client.GetVideoHearingBookingsByUsernameAsList(userAccount.Representative));
            }
            else
            {
                videoHearings = Client.GetVideoHearingBookingsByUsernameAsList(userAccount.Representative);
            }

            return videoHearings;
        }

        public bool DeleteVideoHearingBookingsForAllCaseParticipants(UserAccount userAccount)
        {
            bool success = false;
            var videoHearingsList = GetVideoHearingBookingsForAllParticipants(userAccount);

            try
            {
                DeleteVideoHearingBookingsInList(videoHearingsList);
                success = true;
            }
            catch (Exception ex)
            {
                TestLogger.Log(MethodBase.GetCurrentMethod().Name,
                    "Exception deleting all video hearings: " + ex.Message);
            }

            return success;
        }

        private void DeleteVideoHearingBookingsInList(IEnumerable<HearingDetailsResponse> videoHearings)
        {
            if (videoHearings != null)
            {
                foreach (var videoHearingBooking in videoHearings)
                {
                    Client.DeleteVideoHearingBookingForId(videoHearingBooking.Id.ToString());
                }
            }
        }
    }
}
