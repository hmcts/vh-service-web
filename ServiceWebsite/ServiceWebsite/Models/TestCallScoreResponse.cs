﻿using ServiceWebsite.Domain;

namespace ServiceWebsite.Models
{
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