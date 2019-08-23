﻿using System;
using RestSharp;
using ServiceWebsite.Common;

namespace ServiceWebsite.AcceptanceTests.TestClients
{
    public class ApiTestClientBase : IApiClient
    {
        protected RestClient _client;

        public RestClient Client { get => _client; }

        public ApiTestClientBase(RestClient client, string token)
        {
            _client = InitialiseClient(client, token);
        }

        public Uri GetBaseUrl()
        {
            return _client.BaseUrl;
        }

        public RestClient InitialiseClient(RestClient client, string bearerToken)
        {
            client.AddDefaultHeader("Accept", "application/json");
            client.AddDefaultHeader("Authorization", $"Bearer {bearerToken}");
            return client;
        }

        public RestRequest Get(string path)
        {
            return new RestRequest(path, Method.GET);
        }

        public RestRequest Post(string path, object requestBody)
        {
            var request = new RestRequest(path, Method.POST);
            request.AddParameter("Application/json", ApiRequestHelper.SerialiseRequestToSnakeCaseJson(requestBody),
                ParameterType.RequestBody);
            return request;
        }

        public RestRequest Put(string path, object requestBody)
        {
            var request = new RestRequest(path, Method.PUT);
            request.AddParameter("Application/json", ApiRequestHelper.SerialiseRequestToSnakeCaseJson(requestBody),
                ParameterType.RequestBody);
            return request;
        }

        public RestRequest Delete(string path)
        {
            return new RestRequest(path, Method.DELETE);
        }
    }
}
