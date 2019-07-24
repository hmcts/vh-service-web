using ServiceWebsite.Common;
using ServiceWebsite.Common.Security;
using ServiceWebsite.Domain;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace ServiceWebsite.Services
{
    public class KinlyPlatformService : IKinlyPlatformService
    {
        private readonly ICustomJwtTokenProvider _customJwtTokenProvider;

        public KinlyPlatformService(ICustomJwtTokenProvider customJwtTokenProvider)
        {
            _customJwtTokenProvider = customJwtTokenProvider;
        }

        public async Task<TestCallResult> GetTestCallScoreAsync(Guid participantId)
        {
            HttpResponseMessage responseMessage;
            using (var httpClient = new HttpClient())
            {
                var requestUri = $"https://dev.self-test.hearings.hmcts.net/api/v1/testcall/{participantId}";

                var request = new HttpRequestMessage
                {
                    RequestUri = new Uri(requestUri),
                    Method = HttpMethod.Get,
                };

                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _customJwtTokenProvider.GenerateToken(participantId.ToString(), 2));

                responseMessage = await httpClient.SendAsync(request);
            }

            if (!responseMessage.IsSuccessStatusCode)
            {
                return null;
            }

            var content = await responseMessage.Content.ReadAsStringAsync();
            var testCall = ApiRequestHelper.DeserialiseSnakeCaseJsonToResponse<KinlyVideoTestCall>(content);

            return new TestCallResult(testCall.Passed, testCall.Score);
        }
    }
}