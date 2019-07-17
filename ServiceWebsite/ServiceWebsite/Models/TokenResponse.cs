using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServiceWebsite.Models
{
    public class TokenResponse
    {
        public string ExpiresOn { get; set; }
        public string Token { get; set; }
    }
}
