using System.Net;
using ServiceWebsite.AcceptanceTests.Clients;
using ServiceWebsite.AcceptanceTests.Configuration;
using ServiceWebsite.AcceptanceTests.Models;

namespace ServiceWebsite.AcceptanceTests
{
    public class BookingsClient

    {
        APIClient __client;

        public BookingsClient(string url)
        {
            BaseUrl = url;
            __client = new APIClient(BaseUrl);
        }

        public string BaseUrl { get; internal set; }

        public string CreateNewVideoHearingsBooking(UserAccount userAccount)
        {
            var requestBody = CreateHearingRequest.BuildRequest(userAccount.Individual, userAccount.Representative);
            var request = __client.Post("/hearings", requestBody);
            var response = __client.CreateClient().Execute(request);
            return response.Content;
        }

        public string GetVideoHearingsActiveBookings(string userName)
        {
            var request = __client.Get($"/hearings/?username={userName}");
            var response = __client.CreateClient().Execute(request);
            return response.Content;
        }

        public HttpStatusCode DeleteVideoHearingBookingById(string hearingId)
        {
            var request = __client.Delete($"/hearings/{hearingId}");
            var response = __client.CreateClient().Execute(request);
            return response.StatusCode;
        }
    }
}
