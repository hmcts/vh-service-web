using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ServiceWebsite.Common;
using ServiceWebsite.Configuration;
using ServiceWebsite.Controllers;
using ServiceWebsite.Helpers;
using System;
using System.IO;

namespace ServiceWebsite
{
    public class Startup
    {
        public Startup()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", false, true)
                .AddEnvironmentVariables();
            builder.AddUserSecrets<Startup>();

            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        /// <summary>
        ///     This method gets called by the runtime. Use this method to add services to the container.
        /// </summary>
        /// <param name="services"></param>
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<ITelemetryInitializer>(new CloudRoleNameInitializer());

            services.AddCors();

            services.AddJsonOptions();

            RegisterSettings(services);

            services.AddCustomTypes();

            var settings = Configuration.GetSection("AzureAd").Get<SecuritySettings>();
            services.AddApplicationInsightsTelemetry(settings.AppInsightsKey);

            RegisterAuth(services);
            services.AddMvc();

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        private void RegisterSettings(IServiceCollection services)
        {
            services.Configure<SecuritySettings>(options => Configuration.Bind("AzureAd", options));
            services.Configure<ServiceSettings>(options => Configuration.Bind("VhServices", options));
            services.Configure<AppConfigSettings>(options => Configuration.Bind(options));

            var customTokenSettings = Configuration.GetSection("CustomToken").Get<CustomTokenSettings>();
            services.AddSingleton(customTokenSettings);
        }

        private void RegisterAuth(IServiceCollection services)
        {
            var securitySettings = Configuration.GetSection("AzureAd").Get<SecuritySettings>();

            var policy = new AuthorizationPolicyBuilder()
                .RequireAuthenticatedUser()
                .Build();

            services.AddMvc(options => { options.Filters.Add(new AuthorizeFilter(policy)); });

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.Authority = securitySettings.Authority;
                options.TokenValidationParameters.ValidateLifetime = true;
                options.Audience = securitySettings.ClientId;
                options.TokenValidationParameters.ClockSkew = TimeSpan.Zero;
            });

            services.AddAuthorization();
        }

        /// <summary>
        ///     This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// </summary>
        /// <param name="app"></param>
        /// <param name="env"></param>
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (!env.IsProduction())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    const string url = "/swagger/v1/swagger.json";
                    c.SwaggerEndpoint(url, "Video Hearings Website backend");
                });
            }

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // this will route any unhandled exceptions to the angular error page
                app.UseExceptionHandler(Urls.Error);
                app.UseHsts();
                app.UseHttpsRedirection();
            }

            app.UseAuthentication();

            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowCredentials()
                .AllowAnyHeader());

            app.UseMiddleware<ExceptionMiddleware>();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            // HTTP Response Headers
            app.UseXContentTypeOptions();
            app.UseReferrerPolicy(opts => opts.NoReferrer());
            app.UseXXssProtection(options => options.EnabledWithBlockMode());
            app.UseNoCacheHttpHeaders();
            app.UseHsts(options => options.MaxAge(365).IncludeSubdomains());
            app.UseXfo(options => options.SameOrigin());

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // Make the source folder relative to content to allow integration test project to run as well
                var sourcePath = Path.Combine(env.ContentRootPath, "ClientApp");
                spa.Options.SourcePath = sourcePath;

                if (env.IsDevelopment())
                {
                    // this magically uses the ng serve to host the web app under the same port as the api
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}