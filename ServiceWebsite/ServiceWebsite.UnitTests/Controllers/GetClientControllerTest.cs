using System;
using System.Collections.Generic;
using System.Text;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using NUnit.Framework;
using ServiceWebsite.Configuration;
using ServiceWebsite.Controllers;
using ServiceWebsite.Models;

namespace ServiceWebsite.UnitTests.Controllers
{
    public class GetClientConfigurationSettingsTests
    {
        [Test]
        public void Should_return_response_with_settings()
        {
            var securitySettings = new SecuritySettings
            {
                ClientId = "ClientId",
                TenantId = "TenantId",
                ClientSecret = "ClientSecret",
                Authority = "Authority",
            };

            var serviceSettings = new ServiceSettings
            {
                BookingsApiResourceId = "BookingsApiResourceId",
                BookingsApiUrl = "BookingsApiUrl"
            };

            var configSettingsController = new ConfigController(Options.Create(serviceSettings), Options.Create(securitySettings));

            var result = configSettingsController.GetConfiguration();
            result.Should().NotBeNull();
        }
    }
}
