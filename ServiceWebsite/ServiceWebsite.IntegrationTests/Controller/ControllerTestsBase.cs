using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.PlatformAbstractions;
using Microsoft.IdentityModel.Tokens;
using NUnit.Framework;
using ServiceWebsite.Common.Security;
using ServiceWebsite.IntegrationTests.Helper;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ServiceWebsite.IntegrationTests.Controller
{
    [Parallelizable(ParallelScope.All)]
    public abstract class ControllerTestsBase
    {
        private TestServer _server;
        private readonly string _environmentName = "development";
        private string _accessToken;

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
                WebHost.CreateDefaultBuilder()
                    .UseContentRoot(applicationPath)
                    .UseWebRoot(applicationPath)
                    .UseEnvironment(_environmentName)
                    .UseKestrel(c => c.AddServerHeader = false)
                    .UseStartup<Startup>()
                    // Override the the service container here, add mocks or stubs
                    .ConfigureTestServices(OverrideDependenciesInServiceCollection)
                    // Reconfigure the services 
                    .ConfigureServices(services =>
                    {
                        // Reconfigure the authentication mechanism to allow different settings 
                        services.PostConfigure<JwtBearerOptions>(JwtBearerDefaults.AuthenticationScheme, options =>
                        {
                            options.Audience = "https://test";
                            options.BackchannelHttpHandler = new MockBackchannel();
                            options.MetadataAddress = "https://inmemory.microsoft.com/common/.well-known/openid-configuration";
                            // Validate signature using self signed token that BearerTokenBuilder builds
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

        private static void OverrideDependenciesInServiceCollection(IServiceCollection services)
        {
            services.AddScoped<IHashGenerator>(x => new HashGenerator("What_blah-blah-blah"));
        }

        private void CreateAccessToken()
        {
            _accessToken = new BearerTokenBuilder()
                .WithClaim(ClaimTypes.Name, "doctor@who.com")
                // We are using a self signed certificate to create the SigningCredentials used when signing a token
                .WithSigningCertificate(EmbeddedResourceReader.GetCertificate())
                .BuildToken();
        }

        protected async Task<HttpResponseMessage> SendGetRequestWithBearerTokenAsync(string uri)
        {
            using (var client = _server.CreateClient())
            {
                client.DefaultRequestHeaders.Add("Authorization", $"Bearer {_accessToken}");
                return await client.GetAsync(uri);
            }
        }

        protected async Task<HttpResponseMessage> SendGetRequestAsync(string uri)
        {
            using (var client = _server.CreateClient())
            {
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