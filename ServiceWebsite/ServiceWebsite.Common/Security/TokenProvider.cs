using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using ServiceWebsite.Common.Configuration;

namespace ServiceWebsite.Common.Security
{
    public interface ITokenProvider
    {
        Task<string> GetClientAccessToken(string clientId, string clientSecret, string clientResource);
        Task<AuthenticationResult> GetAuthorisationResult(string clientId, string clientSecret, string clientResource);
    }

    public class TokenProvider : ITokenProvider
    {
        private readonly SecuritySettings _securitySettings;

        public TokenProvider(IOptions<SecuritySettings> securitySettings)
        {
            _securitySettings = securitySettings.Value;
        }

        public async Task<string> GetClientAccessToken(string clientId, string clientSecret, string clientResource)
        {
            var result = await GetAuthorisationResult(clientId, clientSecret, clientResource);
            return result.AccessToken;
        }

        public async Task<AuthenticationResult> GetAuthorisationResult(string clientId, string clientSecret, string clientResource)
        {
            AuthenticationResult result;
            var credential = new ClientCredential(clientId, clientSecret);
            var authContext = new AuthenticationContext($"{_securitySettings.Authority}{_securitySettings.TenantId}");

            try
            {
                result = await authContext.AcquireTokenAsync(clientResource, credential);
            }
            catch (AdalException e)
            {
                throw new UnauthorizedAccessException("Failed to complete API token authorization", e);
            }

            return result;
        }
    }
}