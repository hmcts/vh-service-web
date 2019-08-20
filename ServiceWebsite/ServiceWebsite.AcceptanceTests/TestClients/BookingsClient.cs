using System;
using System.Collections.Generic;
using System.Net;
using ServiceWebsite.AcceptanceTests.Clients;
using ServiceWebsite.AcceptanceTests.Configuration;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Models;
using ServiceWebsite.BookingsAPI.Client;
using ServiceWebsite.Common;

namespace ServiceWebsite.AcceptanceTests
{
    public class BookingsClient

    {
        APIClient __client;
        public string BaseUrl { get; internal set; }
        public string BearerToken { get; internal set; }

        public BookingsClient(string url, string token)
        {
            BaseUrl = url;
            BearerToken = token; 
            __client = new APIClient(BaseUrl, BearerToken);
        }

        public HttpStatusCode CreateNewVideoHearingsBooking(BookNewHearingRequest requestBody)
        {
            var request = __client.Post("/hearings", requestBody);
            var response = __client.CreateClient().Execute(request);
            return response.StatusCode;
        }

        public List<HearingDetailsResponse> GetVideoHearingBookingsByUsernameAsList(string userName)
        {
            var request = __client.Get($"/hearings/?username={userName}");
            var response = __client.CreateClient().Execute(request);
            return ApiRequestHelper.DeserialiseSnakeCaseJsonToResponse<List<HearingDetailsResponse>>(response.Content);
        }

        public HttpStatusCode DeleteVideoHearingBookingForId(string hearingId)
        {
            var request = __client.Delete($"/hearings/{hearingId}");
            var response = __client.CreateClient().Execute(request);
            return response.StatusCode;
        }
    }
}
