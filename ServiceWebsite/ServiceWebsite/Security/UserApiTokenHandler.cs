using ServiceWebsite.Configuration;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using ServiceWebsite.Common.Configuration;
using ServiceWebsite.Common.Security;

namespace ServiceWebsite.Security
{
    public class UserApiTokenHandler : BaseServiceTokenHandler
    {
        public UserApiTokenHandler(IOptions<SecuritySettings> securitySettings,
            IOptions<ServiceSettings> serviceSettings, IMemoryCache memoryCache, ITokenProvider tokenProvider) : base(
            securitySettings, serviceSettings, memoryCache, tokenProvider)
        {
        }

        protected override string TokenCacheKey => "UserApiServiceToken";
        protected override string ClientResource => ServiceSettings.UserApiResourceId;
    }
}
