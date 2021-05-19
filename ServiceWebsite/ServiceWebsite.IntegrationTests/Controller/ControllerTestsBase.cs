using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using NUnit.Framework;
using ServiceWebsite.Common;
using ServiceWebsite.Common.Security;
using ServiceWebsite.Services;
using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using ServiceWebsite.Common.Configuration;

namespace ServiceWebsite.IntegrationTests.Controller
{
    [Parallelizable(ParallelScope.All)]
    public abstract class ControllerTestsBase
    {
        private TestServer _server;
        private string _accessToken = string.Empty;

        protected string SuccessSelfTestScoreParticipantId = "anybe3fa-f4fe-4a45-9de6-123baee253d7";

        [OneTimeSetUp]
        public async Task OneTimeSetup()
        {
            var webHostBuilder =
                WebHost.CreateDefaultBuilder()
                    .UseKestrel(c => c.AddServerHeader = false)
                    .UseEnvironment("Development")
                    .UseStartup<Startup>()
                    .ConfigureTestServices(OverrideDependenciesInServiceCollection);

            _server = new TestServer(webHostBuilder);
            await CreateAccessToken();
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

        private async Task CreateAccessToken()
        {
            var configRootBuilder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .AddEnvironmentVariables()
                .AddUserSecrets<Startup>();

            var configRoot = configRootBuilder.Build();
            var azureAdConfigurationOptions = Options.Create(configRoot.GetSection("AzureAd").Get<SecuritySettings>());
            var azureAdConfiguration = azureAdConfigurationOptions.Value;

            var tokenProvider = new TokenProvider(azureAdConfigurationOptions);
            _accessToken = await tokenProvider.GetClientAccessToken(azureAdConfiguration.ClientId, azureAdConfiguration.ClientSecret, azureAdConfiguration.ClientId);
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