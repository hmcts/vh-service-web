﻿using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace ServiceWebsite.Common
{
    public static class ApiRequestHelper
    {
        public static string SerialiseRequestToSnakeCaseJson(object request)
        {
            var contractResolver = new DefaultContractResolver
            {
                NamingStrategy = new SnakeCaseNamingStrategy()
            };

            return JsonConvert.SerializeObject(request, new JsonSerializerSettings
            {
                ContractResolver = contractResolver,
            });
        }

        public static T DeserialiseSnakeCaseJsonToResponse<T>(string response)
        {
            var contractResolver = new DefaultContractResolver
            {
                NamingStrategy = new SnakeCaseNamingStrategy()
            };

            return JsonConvert.DeserializeObject<T>(response, new JsonSerializerSettings
            {
                ContractResolver = contractResolver,
            });
        }
    }
}
