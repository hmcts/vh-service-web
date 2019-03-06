using System;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Clients.ActiveDirectory;

namespace ServiceWebsite.Security
{
    public interface ITokenProvider
    {
        string GetClientAccessToken(string clientId, string clientSecret, string clientResource);
        AuthenticationResult GetAuthorisationResult(string clientId, string clientSecret, string clientResource);
    }

    public class TokenProvider : ITokenProvider
    {
        private readonly EnvironmentSettings _environmentSettings;

        public TokenProvider(IOptions<EnvironmentSettings> securitySettings)
        {
            _environmentSettings = securitySettings.Value;
        }

        public string GetClientAccessToken(string clientId, string clientSecret, string clientResource)
        {
            var result = GetAuthorisationResult(clientId, clientSecret, clientResource);
            return result.AccessToken;
        }

        public AuthenticationResult GetAuthorisationResult(string clientId, string clientSecret, string clientResource)
        {
            AuthenticationResult result;
            var credential = new ClientCredential(clientId, clientSecret);
            var authContext = new AuthenticationContext($"{_environmentSettings.Authority}{_environmentSettings.TenantId}");

            try
            {
                result = authContext.AcquireTokenAsync(clientResource, credential).Result;
            }
            catch (AdalException e)
            {
                throw new UnauthorizedAccessException("Failed to complete API token authorization", e);
            }

            return result;
        }
    }
}