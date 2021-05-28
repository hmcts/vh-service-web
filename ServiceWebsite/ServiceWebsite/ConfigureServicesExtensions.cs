using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Serialization;
using BookingsApi.Client;
using ServiceWebsite.Common.Security;
using ServiceWebsite.Configuration;
using ServiceWebsite.Security;
using ServiceWebsite.Services;
using ServiceWebsite.Swagger;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Reflection;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Microsoft.OpenApi.Models;
using System.IO;
using ServiceWebsite.Common.Configuration;
using Swashbuckle.AspNetCore.Swagger;
using ServiceWebsite.Models;
using UserApi.Client;

namespace ServiceWebsite
{
    public static class ConfigureServicesExtensions
    {
        public static IServiceCollection AddCustomTypes(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddMemoryCache();
            serviceCollection.AddScoped<SecuritySettings>();
            serviceCollection.AddScoped<ServiceSettings>();
            serviceCollection.AddTransient<AddBearerTokenHeaderHandler>();
            serviceCollection.AddTransient<UserApiTokenHandler>();
            serviceCollection.AddTransient<BookingsApiTokenHandler>();
            serviceCollection.AddScoped<ITokenProvider, TokenProvider>();
            serviceCollection.AddScoped<SecuritySettings>();
            serviceCollection.AddScoped<ICustomJwtTokenProvider, CustomJwtTokenProvider>();


            // Build the hearings api client using a reusable HttpClient factory and predefined base url
            var container = serviceCollection.BuildServiceProvider();
            var serviceSettings = container.GetService<IOptions<ServiceSettings>>().Value;
            var customJwtTokenProvider = container.GetService<ICustomJwtTokenProvider>();
            
            serviceCollection.AddHttpClient<IUserApiClient, UserApiClient>()
                .AddHttpMessageHandler<UserApiTokenHandler>()
                .AddTypedClient(httpClient => BuildUserApiClient(httpClient, serviceSettings));

            serviceCollection.AddHttpClient<IBookingsApiClient, BookingsApiClient>()
            .AddHttpMessageHandler<BookingsApiTokenHandler>()
            .AddTypedClient(httpClient => BuildBookingsApiClient(httpClient, serviceSettings));

            serviceCollection
                .AddHttpClient<IKinlyPlatformService, KinlyPlatformService>()
            .AddTypedClient(httpClient => BuildKinlyPlatformService(httpClient, customJwtTokenProvider, serviceSettings));

            serviceCollection.AddTransient<IParticipantService, ParticipantService>();
            serviceCollection.AddTransient<IHearingsService, HearingsService>();
            serviceCollection.AddTransient<IHearingSuitabilityService, HearingSuitabilityService>();
            serviceCollection.AddScoped<IHashGenerator, HashGenerator>();
            serviceCollection.AddSingleton<IPollyRetryService, PollyRetryService>();

            serviceCollection.AddSwaggerToApi();
            return serviceCollection;
        }

        private static IUserApiClient BuildUserApiClient(HttpClient httpClient, ServiceSettings serviceSettings)
        {
            return UserApiClient.GetClient(serviceSettings.UserApiUrl, httpClient);
        }

        private static IKinlyPlatformService BuildKinlyPlatformService(HttpClient httpClient,
            ICustomJwtTokenProvider customJwtTokenProvider, ServiceSettings serviceSettings)
        {
            var service = new KinlyPlatformService(httpClient, customJwtTokenProvider,
                serviceSettings.KinlySelfTestScoreEndpointUrl);
            return service;
        }

        private static IBookingsApiClient BuildBookingsApiClient(HttpClient httpClient, ServiceSettings serviceSettings)
        {
            return BookingsApiClient.GetClient(serviceSettings.BookingsApiUrl, httpClient);
        }

        private static void AddSwaggerToApi(this IServiceCollection serviceCollection)
        {
            var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);

            var contractsXmlFile = $"{typeof(TestCallScoreResponse).Assembly.GetName().Name}.xml";
            var contractsXmlPath = Path.Combine(AppContext.BaseDirectory, contractsXmlFile);

            serviceCollection.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Video Hearings Service Web API", Version = "v1" });
                c.AddFluentValidationRules();
                c.IncludeXmlComments(xmlPath);
                c.IncludeXmlComments(contractsXmlPath);
                c.EnableAnnotations();

                c.AddSecurityDefinition("Bearer",
                    new OpenApiSecurityScheme
                    {
                        Description = "Please enter JWT with Bearer into field",
                        Type = SecuritySchemeType.Http,
                        Scheme = "bearer"
                    });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement{
                    {
                        new OpenApiSecurityScheme{
                            Reference = new OpenApiReference{
                                Id = "Bearer",
                                Type = ReferenceType.SecurityScheme
                            }
                        },new List<string>()
                    }
                });
                c.OperationFilter<AuthResponsesOperationFilter>();
            });
            serviceCollection.AddSwaggerGenNewtonsoftSupport();
        }

        public static IServiceCollection AddJsonOptions(this IServiceCollection serviceCollection)
        {
            var contractResolver = new DefaultContractResolver
            {
                NamingStrategy = new SnakeCaseNamingStrategy()
            };


            serviceCollection.AddMvc()
                            .AddNewtonsoftJson(options =>
                            {
                                options.SerializerSettings.ContractResolver = contractResolver;
                                options.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Utc;
                                options.SerializerSettings.Converters.Add(new StringEnumConverter());
                            });

            return serviceCollection;
        }
    }
}