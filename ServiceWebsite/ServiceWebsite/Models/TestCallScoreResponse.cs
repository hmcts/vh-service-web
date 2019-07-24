using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServiceWebsite.Models
{
    /// <summary>
    /// The score of a test call
    /// </summary>
    public class TestCallScoreResponse
    {
        /// <summary>
        /// The score of the test call
        /// </summary>
        public TestScore Score { get; set; }

        /// <summary>
        /// Whether or not the call was successful
        /// </summary>
        public bool Passed { get; set; }
    }
}
