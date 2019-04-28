using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Reflection;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Serialization;
using ServiceWebsite.BookingsAPI.Client;
using Swashbuckle.AspNetCore.Swagger;
using ServiceWebsite.Security;
using ServiceWebsite.Services;
using ServiceWebsite.Swagger;
using ServiceWebsite.UserAPI.Client;
using ServiceWebsite.Configuration;
using ServiceWebsite.Domain;

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
            serviceCollection.AddHttpClient<IUserApiClient, UserApiClient>()
                .AddHttpMessageHandler(() => container.GetService<UserApiTokenHandler>())
                .AddTypedClient(httpClient => BuildUserApiClient(httpClient, serviceSettings));
            
            serviceCollection.AddHttpClient<IBookingsApiClient, BookingsApiClient>()
                .AddHttpMessageHandler(() => container.GetService<BookingsApiTokenHandler>())
                .AddTypedClient(httpClient => BuildUserApiClient(httpClient, serviceSettings));

            serviceCollection.AddTransient<IParticipantService, ParticipantService>();
            serviceCollection.AddTransient<IHearingsService, HearingsService>();
            serviceCollection.AddTransient<IHearingSuitabilityService, HearingSuitabilityService>();

            serviceCollection.AddSwaggerToApi();
            return serviceCollection;
        }

        private static IUserApiClient BuildUserApiClient(HttpClient httpClient, ServiceSettings serviceSettings)
        {
            return new UserApiClient(httpClient) { BaseUrl = serviceSettings.UserApiUrl };
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
                        In = "header", Description = "Please enter JWT with Bearer into field", Name = "Authorization",
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
                .AddJsonOptions(options => options.SerializerSettings.ContractResolver = contractResolver)
                .AddJsonOptions(options => options.SerializerSettings.Converters.Add(new Newtonsoft.Json.Converters.StringEnumConverter()));

            return serviceCollection;
        }
    }
}