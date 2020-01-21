using ServiceWebsite.Configuration;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;

namespace ServiceWebsite.Security
{
    /// <summary>
    /// Token handler
    /// </summary>
    public class BookingsApiTokenHandler : BaseServiceTokenHandler
    {
        /// <summary>
        /// Token handler
        /// </summary>
        public BookingsApiTokenHandler(IOptions<SecuritySettings> securitySettings,
            IOptions<ServiceSettings> serviceSettings, IMemoryCache memoryCache, ITokenProvider tokenProvider) : base(
            securitySettings, serviceSettings, memoryCache, tokenProvider)
        {
        }

        /// <summary>
        /// Token Cache
        /// </summary>
        protected override string TokenCacheKey => "HearingApiServiceToken";

        /// <summary>
        /// Client resource
        /// </summary>
        protected override string ClientResource => ServiceSettings.BookingsApiResourceId;
    }
}
