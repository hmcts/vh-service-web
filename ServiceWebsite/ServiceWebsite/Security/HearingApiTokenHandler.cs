using ServiceWebsite.Configuration;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;

namespace ServiceWebsite.Security
{
    public class BookingsApiTokenHandler : BaseServiceTokenHandler
    {
        public BookingsApiTokenHandler(IOptions<SecuritySettings> securitySettings,
            IOptions<ServiceSettings> serviceSettings, IMemoryCache memoryCache, ITokenProvider tokenProvider) : base(
            securitySettings, serviceSettings, memoryCache, tokenProvider)
        {
        }

        protected override string TokenCacheKey => "HearingApiServiceToken";
        protected override string ClientResource => ServiceSettings.BookingsApiResourceId;
    }
}
