﻿using System.Collections;

namespace ServiceWebsite.Models
{
    public class HealthCheckResponse
    {
        public HealthCheckResponse()
        {
            BookingsApiHealth = new HealthCheck();
            UserApiHealth = new HealthCheck();
            AppVersion = new ApplicationVersion();
        }
        public HealthCheck BookingsApiHealth { get; set; }
        public HealthCheck UserApiHealth { get; set; }
        public ApplicationVersion AppVersion { get; set; }
    }

    public class HealthCheck
    {
        public bool Successful { get; set; }
        public string ErrorMessage { get; set; }
        public IDictionary Data { get; set; }
    }

    public class ApplicationVersion
    {
        public string FileVersion { get; set; }
        public string InformationVersion { get; set; }
    }
}