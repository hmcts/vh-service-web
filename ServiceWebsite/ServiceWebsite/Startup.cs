﻿using System;
using System.IO;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.SpaServices;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ServiceWebsite.Common;
using ServiceWebsite.Configuration;
using ServiceWebsite.Controllers;
using ServiceWebsite.Helpers;

namespace ServiceWebsite
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        /// <summary>
        ///     This method gets called by the runtime. Use this method to add services to the container.
        /// </summary>
        /// <param name="services"></param>
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<ITelemetryInitializer>(new CloudRoleNameInitializer());

            services.AddCors(options => options.AddPolicy("CorsPolicy",
                builder =>
                {
                    builder
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .SetIsOriginAllowed((host) => true)
                        .AllowCredentials();
                }));

            services.AddJsonOptions();

            RegisterSettings(services);

            services.AddCustomTypes();

            var settings = Configuration.Get<EnvironmentSettings>();
            services.AddApplicationInsightsTelemetry(settings.AppInsightsKey);

            RegisterAuth(services);
            services.AddMvc(options => options.EnableEndpointRouting = false);

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
            services.Configure<SecuritySettings>(options => Configuration.Bind("ApplicationInsights", options));
            services.Configure<EnvironmentSettings>(options => Configuration.Bind(options));
            services.Configure<AppConfigSettings>(options => Configuration.Bind(options));
            services.Configure<EnvironmentSettings>(options => Configuration.Bind("AzureStorage", options));

            var customTokenSettings = Configuration.GetSection("CustomToken").Get<CustomTokenSettings>();
            services.AddSingleton(customTokenSettings);
        }

        private void RegisterAuth(IServiceCollection services)
        {
            var settings = Configuration.Get<EnvironmentSettings>();

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
                options.Authority = settings.Authority + settings.TenantId;
                options.TokenValidationParameters.ValidateLifetime = true;
                options.Audience = settings.ClientId;
                options.TokenValidationParameters.ClockSkew = TimeSpan.Zero;
            });

            services.AddAuthorization();
        }

        /// <summary>
        ///     This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// </summary>
        /// <param name="app"></param>
        /// <param name="env"></param>
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
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
            }

            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();
            app.UseHttpsRedirection();
            app.UseCors("CorsPolicy");
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapDefaultControllerRoute(); });

            app.UseMiddleware<ExceptionMiddleware>();
            

            // HTTP Response Headers
            app.UseXContentTypeOptions();
            app.UseReferrerPolicy(opts => opts.NoReferrer());
            app.UseXXssProtection(options => options.EnabledWithBlockMode());
            app.UseNoCacheHttpHeaders();
            app.UseHsts(options => options.MaxAge(365).IncludeSubdomains());
            app.UseXfo(options => options.SameOrigin());

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
