using System.Collections.Generic;
using System.Net;
using RestSharp;
using ServiceWebsite.BookingsAPI.Client;
using ServiceWebsite.Common;

namespace ServiceWebsite.AcceptanceTests.TestClients
{
    public class BookingsApiTestClient : ApiTestClientBase

    {
        public BookingsApiTestClient(RestClient client, string token) : base(client, token)
        {
        }

        public HttpStatusCode CreateNewVideoHearingsBooking(BookNewHearingRequest requestBody)
        {
            var request = Post("/hearings", requestBody);
            var response = Client.Execute(request);
            return response.StatusCode;
        }

        public List<HearingDetailsResponse> GetVideoHearingBookingsByUsernameAsList(string userName)
        {
            var request = Get($"/hearings/?username={userName}");
            var response = _client.Execute(request);
            return ApiRequestHelper.DeserialiseSnakeCaseJsonToResponse<List<HearingDetailsResponse>>(response.Content);
        }

        public HttpStatusCode DeleteVideoHearingBookingForId(string hearingId)
        {
            var request = Delete($"/hearings/{hearingId}");
            var response = _client.Execute(request);
            return response.StatusCode;
        }
    }
}
