using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.PlatformAbstractions;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using NUnit.Framework;
using ServiceWebsite.Configuration;
using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;

namespace ServiceWebsite.IntegrationTests.Controller
{
    [Parallelizable(ParallelScope.All)]
    public abstract class ControllerTestsBase
    {
        private TestServer _server;
        private readonly string _environmentName = "development";
        private string _bearerToken;

        protected ControllerTestsBase()
        {
            if (!string.IsNullOrWhiteSpace(Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")))
            {
                _environmentName = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            }
        }
        
        [OneTimeSetUp]
        public void OneTimeSetup()
        {
            var integrationTestsPath = PlatformServices.Default.Application.ApplicationBasePath;
            var applicationPath = Path.GetFullPath(Path.Combine(integrationTestsPath, "../../../../ServiceWebsite"));
            TestContext.WriteLine($"Using content root: {applicationPath}");

            var webHostBuilder =
                new WebHostBuilder()
                    .UseContentRoot(applicationPath)
                    .UseWebRoot(applicationPath)
                    .UseEnvironment(_environmentName)
                    .UseStartup<Startup>();

            _server = new TestServer(webHostBuilder);
            GetClientAccessTokenForApi();
        }

        private void GetClientAccessTokenForApi()
        {
            var configRootBuilder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .AddEnvironmentVariables()
                .AddUserSecrets("CF5CDD5E-FD74-4EDE-8765-2F899C252122");

            var configRoot = configRootBuilder.Build();
            var azureAdConfig = Options.Create(configRoot.GetSection("AzureAd").Get<SecuritySettings>()).Value;
            var authContext = new AuthenticationContext(azureAdConfig.Authority);
            var credential = new ClientCredential(azureAdConfig.ClientId, azureAdConfig.ClientSecret);
            _bearerToken = authContext.AcquireTokenAsync(azureAdConfig.VhServiceResourceId, credential).Result.AccessToken;
        }

        [OneTimeTearDown]
        public void OneTimeTearDown()
        {
            _server.Dispose();
        }

        protected async Task<HttpResponseMessage> SendGetRequestAsync(string uri)
        {
            using (var client = _server.CreateClient())
            {
                client.DefaultRequestHeaders.Add("Authorization", $"Bearer {_bearerToken}");
                return await client.GetAsync(uri);
            }
        }

        protected async Task<HttpResponseMessage> SendPostRequestAsync(string uri, HttpContent httpContent)
        {
            using (var client = _server.CreateClient())
            {
                return await client.PostAsync(uri, httpContent);
            }
        }

        protected async Task<HttpResponseMessage> SendPatchRequestAsync(string uri, StringContent httpContent)
        {
            using (var client = _server.CreateClient())
            {
                return await client.PatchAsync(uri, httpContent);
            }
        }

        protected async Task<HttpResponseMessage> SendPutRequestAsync(string uri, StringContent httpContent)
        {
            using (var client = _server.CreateClient())
            {
                return await client.PutAsync(uri, httpContent);
            }
        }

        protected async Task<HttpResponseMessage> SendDeleteRequestAsync(string uri)
        {
            using (var client = _server.CreateClient())
            {
                return await client.DeleteAsync(uri);
            }
        }
    }
}