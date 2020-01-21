using System.Collections.Generic;
using ServiceWebsite.BookingsAPI.Client;

namespace ServiceWebsite.AcceptanceTests.Data
{
    public class Test
    {
        public HearingDetailsResponse Hearing { get; set; }
        public List<SuitabilityAnswer> Answers { get; set; }
    }
}
