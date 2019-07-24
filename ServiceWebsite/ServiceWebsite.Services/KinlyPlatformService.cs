using ServiceWebsite.Domain;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace ServiceWebsite.Services
{
    public class KinlyPlatformService :IKinlyPlatformService
    {

        //private readonly IKinlyApiClient _kinlyApiClient;
        //private readonly ICustomJwtTokenProvider _customJwtTokenProvider;
        //private readonly ILogger<KinlyPlatformService> _logger;
        //private readonly ServicesConfiguration _servicesConfigOptions;

        //public KinlyPlatformService(IKinlyApiClient kinlyApiClient,
        //    IOptions<ServicesConfiguration> servicesConfigOptions,
        //    ICustomJwtTokenProvider customJwtTokenProvider, ILogger<KinlyPlatformService> logger)
        //{
        //    _kinlyApiClient = kinlyApiClient;
        //    _customJwtTokenProvider = customJwtTokenProvider;
        //    _logger = logger;
        //    _servicesConfigOptions = servicesConfigOptions.Value;
        //}
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

                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer",
                    _customJwtTokenProvider.GenerateToken(participantId.ToString(), 2));

                responseMessage = await httpClient.SendAsync(request);
            }

            if (!responseMessage.IsSuccessStatusCode)
            {
                return null;
            }

            var content = await responseMessage.Content.ReadAsStringAsync();
            var testCall = ApiRequestHelper.DeserialiseSnakeCaseJsonToResponse<Testcall>(content);
            return new TestCallResult(testCall.Passed, (TestScore)testCall.Score);
        }
    }
}
}
