using System;
using System.Collections.Generic;
using System.Text;

namespace ServiceWebsite.UnitTests.Response
{

    /// <summary>
    /// Court Response
    /// </summary>
    public class CourtResponse
    {
        /// <summary>
        /// Court ID
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Court room
        /// </summary>
        public string Room { get; set; }

        /// <summary>
        /// Court address
        /// </summary>
        public string Address { get; set; }
    }
}
