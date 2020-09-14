using System.Collections.Generic;
using ServiceWebsite.Services.TestApi;

namespace ServiceWebsite.AcceptanceTests.Data
{
    public class Test
    {
        public HearingDetailsResponse Hearing { get; set; }
        public List<SuitabilityAnswer> Answers { get; set; }
    }
}
