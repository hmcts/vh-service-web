using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace ServiceWebsite.Helpers
{
    public static class ClaimsHelper
    {
        const string TYPE_OID = "oid";
        const string TYPE_UNKNOWN = "unknown";

        public static string FindAdId(IEnumerable<Claim> userClaims )
        {
            var userAdObjectId = userClaims.FirstOrDefault(m => m.Type == TYPE_OID);
            return userAdObjectId != null ? userAdObjectId.Value : TYPE_UNKNOWN;
        }
    }
}
