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
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Reflection;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Microsoft.OpenApi.Models;
using System.IO;
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Swashbuckle.AspNetCore.SwaggerGen;
using Swashbuckle.AspNetCore.Newtonsoft;
using Microsoft.Extensions.DependencyInjection.Extensions;

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
            serviceCollection.AddScoped<IHashGenerator>(x => new HashGenerator(customTokenSettings.Secret));
            serviceCollection.AddSingleton<IPollyRetryService, PollyRetryService>();

            serviceCollection.AddSwaggerToApi();
            return serviceCollection;
        }

        /// <summary>
        /// Temporary work-around until typed-client bug is restored
        /// https://github.com/dotnet/aspnetcore/issues/13346#issuecomment-535544207
        /// </summary>
        /// <param name="builder"></param>
        /// <param name="factory"></param>
        /// <typeparam name="TClient"></typeparam>
        /// <returns></returns>
        /// <exception cref="ArgumentNullException"></exception>
        private static IHttpClientBuilder AddTypedClient<TClient>(this IHttpClientBuilder builder,
            Func<HttpClient, TClient> factory)
            where TClient : class
        {
            if (builder == null)
            {
                throw new ArgumentNullException(nameof(builder));
            }

            if (factory == null)
            {
                throw new ArgumentNullException(nameof(factory));
            }

            builder.Services.AddTransient(s =>
            {
                var httpClientFactory = s.GetRequiredService<IHttpClientFactory>();
                var httpClient = httpClientFactory.CreateClient(builder.Name);

                return factory(httpClient);
            });

            return builder;
        }

        private static IUserApiClient BuildUserApiClient(HttpClient httpClient, ServiceSettings serviceSettings)
        {
            var client = new UserApiClient(httpClient) { BaseUrl = serviceSettings.UserApiUrl };
            return client;
        }

        private static IKinlyPlatformService BuildKinlyPlatformService(HttpClient httpClient, CustomJwtTokenProvider customJwtTokenProvider, ServiceSettings serviceSettings)
        {
            var service = new KinlyPlatformService(httpClient, customJwtTokenProvider, serviceSettings.KinlySelfTestScoreEndpointUrl);
            return service;
        }

        private static IBookingsApiClient BuildBookingsApiClient(HttpClient httpClient, ServiceSettings serviceSettings)
        {
            return new BookingsApiClient(httpClient) { BaseUrl = serviceSettings.BookingsApiUrl };
        }

        private static void AddSwaggerToApi(this IServiceCollection serviceCollection)
        {
            var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);

            var contractsXmlFile = $"{typeof(ParticipantResponse).Assembly.GetName().Name}.xml";
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