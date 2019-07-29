using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace ServiceWebsite.Common
{
    public class FakeHttpMessageHandler : HttpMessageHandler
    {
        private readonly IDictionary<Uri, HttpResponseMessage> _configuredResponses = new Dictionary<Uri, HttpResponseMessage>();

        public void Register(string url, HttpResponseMessage httpResponseMessage)
        {
            var uri = new Uri(url);

            if (!_configuredResponses.ContainsKey(uri))
            {
                _configuredResponses.Add(uri, httpResponseMessage);
            }
        }

        public virtual HttpResponseMessage Send(HttpRequestMessage request)
        {
            if (_configuredResponses.ContainsKey(request.RequestUri))
            {
                return _configuredResponses[request.RequestUri];
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