using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Serialization;
using ServiceWebsite.BookingsAPI.Client;
using ServiceWebsite.Common.Security;
using ServiceWebsite.Configuration;
using ServiceWebsite.Security;
using ServiceWebsite.Services;
using ServiceWebsite.Swagger;
using ServiceWebsite.UserAPI.Client;
using Swashbuckle.AspNetCore.Swagger;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Reflection;

namespace ServiceWebsite
{
    public static class ConfigureServicesExtensions
    {
        public static IServiceCollection AddCustomTypes(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddMemoryCache();
            serviceCollection.AddScoped<EnvironmentSettings>();
            serviceCollection.AddTransient<AddBearerTokenHeaderHandler>();
            serviceCollection.AddTransient<UserApiTokenHandler>();
            serviceCollection.AddTransient<BookingsApiTokenHandler>();
            serviceCollection.AddScoped<ITokenProvider, TokenProvider>();
            serviceCollection.AddScoped<SecuritySettings>();


            // Build the hearings api client using a reusable HttpClient factory and predefined base url
            var container = serviceCollection.BuildServiceProvider();
            var serviceSettings = container.GetService<IOptions<ServiceSettings>>().Value;
            var customTokenSettings = container.GetService<CustomTokenSettings>();

            var customJwtTokenProvider = new CustomJwtTokenProvider
            (
                customTokenSettings.Secret,
                customTokenSettings.Audience,
                customTokenSettings.Issuer,
                customTokenSettings.ThirdPartySecret
            );

            serviceCollection.AddSingleton<ICustomJwtTokenProvider>(customJwtTokenProvider);

            serviceCollection
                .AddHttpClient<IUserApiClient, UserApiClient>()
                .AddHttpMessageHandler(() => container.GetService<UserApiTokenHandler>())
                .AddTypedClient(httpClient => BuildUserApiClient(httpClient, serviceSettings));

            serviceCollection
                .AddHttpClient<IBookingsApiClient, BookingsApiClient>()
                .AddHttpMessageHandler(() => container.GetService<BookingsApiTokenHandler>())
                .AddTypedClient(httpClient => BuildBookingsApiClient(httpClient, serviceSettings));

            serviceCollection
                .AddHttpClient<IKinlyPlatformService, KinlyPlatformService>()
                .AddTypedClient<IKinlyPlatformService>(httpClient => new KinlyPlatformService(httpClient, customJwtTokenProvider, serviceSettings.KinlySelfTestScoreEndpointUrl));

            serviceCollection.AddTransient<IParticipantService, ParticipantService>();
            serviceCollection.AddTransient<IHearingsService, HearingsService>();
            serviceCollection.AddTransient<IHearingSuitabilityService, HearingSuitabilityService>();
            serviceCollection.AddScoped<IHashGenerator>(x => new HashGenerator(customTokenSettings.Secret));

            serviceCollection.AddSwaggerToApi();
            return serviceCollection;
        }

        private static IUserApiClient BuildUserApiClient(HttpClient httpClient, ServiceSettings serviceSettings)
        {
            return new UserApiClient(httpClient) { BaseUrl = serviceSettings.UserApiUrl };
        }

        private static IBookingsApiClient BuildBookingsApiClient(HttpClient httpClient, ServiceSettings serviceSettings)
        {
            return new BookingsApiClient(httpClient) { BaseUrl = serviceSettings.BookingsApiUrl };
        }

        private static void AddSwaggerToApi(this IServiceCollection serviceCollection)
        {
            var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);

            serviceCollection.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "Video Hearings Service Web API", Version = "v1" });
                c.IncludeXmlComments(xmlPath);
                c.EnableAnnotations();
                c.AddSecurityDefinition("Bearer",
                    new ApiKeyScheme
                    {
                        In = "header",
                        Description = "Please enter JWT with Bearer into field",
                        Name = "Authorization",
                        Type = "apiKey"
                    });
                c.AddSecurityRequirement(new Dictionary<string, IEnumerable<string>>
                {
                    {"Bearer", Enumerable.Empty<string>()}
                });
                c.OperationFilter<AuthResponsesOperationFilter>();
            });
        }

        public static IServiceCollection AddJsonOptions(this IServiceCollection serviceCollection)
        {
            var contractResolver = new DefaultContractResolver
            {
                NamingStrategy = new SnakeCaseNamingStrategy()
            };

            serviceCollection.AddMvc()
                .AddJsonOptions(options =>
                {
                    options.SerializerSettings.ContractResolver = contractResolver;
                    options.SerializerSettings.DateTimeZoneHandling = Newtonsoft.Json.DateTimeZoneHandling.Utc;
                })
                .AddJsonOptions(options =>
                    options.SerializerSettings.Converters.Add(new Newtonsoft.Json.Converters.StringEnumConverter()));


            return serviceCollection;
        }
    }
}