using ServiceWebsite.Common;
using ServiceWebsite.Common.Security;
using ServiceWebsite.Domain;
using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace ServiceWebsite.Services
{
    public class KinlyPlatformService : IKinlyPlatformService
    {
        private readonly HttpClient _httpClient;
        private readonly ICustomJwtTokenProvider _customJwtTokenProvider;
        private readonly string _kinlySelfTestScoreEndpointUrl;

        public KinlyPlatformService(HttpClient httpClient, ICustomJwtTokenProvider customJwtTokenProvider,
            string kinlySelfTestScoreEndpointUrl)
        {
            _httpClient = httpClient;
            _customJwtTokenProvider = customJwtTokenProvider;
            _kinlySelfTestScoreEndpointUrl = kinlySelfTestScoreEndpointUrl;
        }

        public async Task<TestCallResult> GetTestCallScoreAsync(Guid participantId)
        {
            var requestUri = $"{_kinlySelfTestScoreEndpointUrl}/{participantId}";

            var request = new HttpRequestMessage
            {
                RequestUri = new Uri(requestUri),
                Method = HttpMethod.Get
            };

            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer",
                _customJwtTokenProvider.GenerateSelfTestApiToken(participantId.ToString(), 2));

            var responseMessage = await _httpClient.SendAsync(request);

            if (responseMessage.StatusCode == HttpStatusCode.NotFound)
            {
                throw new NotFoundException($"Could not find Self Test for ParticipantId: {participantId}");
            }

            responseMessage.EnsureSuccessStatusCode();

            var content = await responseMessage.Content.ReadAsStringAsync();
            var testCall = ApiRequestHelper.DeserialiseSnakeCaseJsonToResponse<KinlyVideoTestCall>(content);

            return new TestCallResult(testCall.Passed, testCall.Score);
        }
    }
}