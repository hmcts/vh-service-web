using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Moq;
using NUnit.Framework;
using ServiceWebsite.Common;
using ServiceWebsite.Common.Security;
using ServiceWebsite.IntegrationTests.Helper;
using ServiceWebsite.Services;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ServiceWebsite.IntegrationTests.Controller
{
    [Parallelizable(ParallelScope.All)]
    public abstract class ControllerTestsBase
    {
        private TestServer _server;
        private string _accessToken;

        protected string SuccessSelfTestScoreParticipantId = "anybe3fa-f4fe-4a45-9de6-123baee253d7";

        [OneTimeSetUp]
        public void OneTimeSetup()
        {
            var webHostBuilder =
                WebHost.CreateDefaultBuilder()
                    .UseKestrel(c => c.AddServerHeader = false)
                    .UseEnvironment("Development")
                    .UseStartup<Startup>()
                    .ConfigureTestServices(OverrideDependenciesInServiceCollection)
                    .ConfigureServices(services =>
                    {
                        services.PostConfigure<JwtBearerOptions>(JwtBearerDefaults.AuthenticationScheme, options =>
                        {
                            options.Audience = "https://test";
                            options.BackchannelHttpHandler = new MockBackchannel();
                            options.MetadataAddress = "https://inmemory.microsoft.com/common/.well-known/openid-configuration";
                            options.TokenValidationParameters = new TokenValidationParameters
                            {
                                SignatureValidator = (token, parameters) => new JwtSecurityToken(token)
                            };
                        });
                    });

            CreateAccessToken();

            _server = new TestServer(webHostBuilder);
        }

        [OneTimeTearDown]
        public void OneTimeTearDown()
        {
            _server.Dispose();
        }

        private void OverrideDependenciesInServiceCollection(IServiceCollection serviceCollection)
        {
            const string kinlySelfTestScoreEndpointUrl = "https://fakekinly.com";

            // Setup fake responses to http calls
            var fakeHttpHandler = new FakeHttpMessageHandler();
            var httpClientWithFakeHandler = new HttpClient(fakeHttpHandler) { Timeout = TimeSpan.FromSeconds(1) };
            fakeHttpHandler.Register
            (
                $"{kinlySelfTestScoreEndpointUrl}/{SuccessSelfTestScoreParticipantId}",
                new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new StringContent("{'passed':true,'score':1}")
                }
            );

            var customJwtTokenProvider = new Mock<ICustomJwtTokenProvider>();
            customJwtTokenProvider
                .Setup(x => x.GenerateSelfTestApiToken(It.IsAny<string>(), It.IsAny<int>()))
                .Returns(string.Empty);

            serviceCollection.AddScoped<IKinlyPlatformService>(x => new KinlyPlatformService
            (
                httpClientWithFakeHandler,
                customJwtTokenProvider.Object,
                "https://fakekinly.com"
            ));
        }

        private void CreateAccessToken()
        {
            _accessToken = new BearerTokenBuilder()
                .WithClaim(ClaimTypes.Name, "doctor@hmcts.net")
                // We are using a self signed certificate to create the SigningCredentials used when signing a token
                .WithSigningCertificate(EmbeddedResourceReader.GetCertificate())
                .BuildToken();
        }

        protected async Task<HttpResponseMessage> SendGetRequestWithBearerTokenAsync(string uri)
        {
            using var client = _server.CreateClient();
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {_accessToken}");
            return await client.GetAsync(uri);
        }

        protected async Task<HttpResponseMessage> SendGetRequestAsync(string uri)
        {
            using var client = _server.CreateClient();
            return await client.GetAsync(uri);
        }
    }
}