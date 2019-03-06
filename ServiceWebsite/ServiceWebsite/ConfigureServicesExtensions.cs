using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Reflection;
using HearingsAPI.Client;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Serialization;
using Swashbuckle.AspNetCore.Swagger;
using ServiceWebsite.Security;
using ServiceWebsite.Services;
using ServiceWebsite.Swagger;

namespace Website
{
    public static class ConfigureServicesExtensions
    {
        public static IServiceCollection AddCustomTypes(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddMemoryCache();

            serviceCollection.AddScoped<EnvironmentSettings>();

            serviceCollection.AddTransient<AddBearerTokenHeaderHandler>();
            serviceCollection.AddScoped<ITokenProvider, TokenProvider>();

            // Build the hearings api client using a reusable HttpClient factory and predefined base url
            var container = serviceCollection.BuildServiceProvider();
            var settings = container.GetService<IOptions<EnvironmentSettings>>().Value;
            serviceCollection.AddHttpClient<IVhApiClient, VhApiClient>()
                .AddTypedClient(httpClient => BuildHearingsApiClient(httpClient, settings))
                .AddHttpMessageHandler(() => container.GetService<AddBearerTokenHeaderHandler>());

            serviceCollection.AddTransient<IParticipantService, ParticipantService>();
            serviceCollection.AddTransient<IChecklistService, ChecklistService>();
            serviceCollection.AddTransient<IHearingsService, HearingsService>();

            serviceCollection.AddSwaggerToApi();
            return serviceCollection;
        }

        private static IVhApiClient BuildHearingsApiClient(HttpClient httpClient, EnvironmentSettings settings)
        {
            return new VhApiClient(httpClient) {BaseUrl = settings.HearingsApiUrl};
        }

        private static void AddSwaggerToApi(this IServiceCollection serviceCollection)
        {
            var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);

            serviceCollection.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info {Title = "Hearings API", Version = "v1"});
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