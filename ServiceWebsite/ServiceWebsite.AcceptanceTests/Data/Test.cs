using System.Collections.Generic;
using BookingsApi.Contract.Responses;

namespace ServiceWebsite.AcceptanceTests.Data
{
    public class Test
    {
        public HearingDetailsResponse Hearing { get; set; }
        public List<SuitabilityAnswer> Answers { get; set; }
    }
}
