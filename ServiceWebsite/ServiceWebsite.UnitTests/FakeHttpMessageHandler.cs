using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace ServiceWebsite.UnitTests
{
    public class FakeHttpMessageHandler : HttpMessageHandler
    {
        public IDictionary<Uri, HttpResponseMessage> ConfiguredResponses = new Dictionary<Uri, HttpResponseMessage>();

        public void Register(string url, HttpResponseMessage httpResponseMessage)
        {
            var uri = new Uri(url);

            if (!ConfiguredResponses.ContainsKey(uri))
            {
                ConfiguredResponses.Add(uri, httpResponseMessage);
            }
        }

        public virtual HttpResponseMessage Send(HttpRequestMessage request)
        {
            if (ConfiguredResponses.ContainsKey(request.RequestUri))
            {
                return ConfiguredResponses[request.RequestUri];
            }

            return new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent("No Urls registered, please use Register(string)")
            };
        }

        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, System.Threading.CancellationToken cancellationToken)
        {
            return Task.FromResult(Send(request));
        }
    }
}