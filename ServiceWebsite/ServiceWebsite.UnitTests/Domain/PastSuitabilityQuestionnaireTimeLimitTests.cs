using System;
using FluentAssertions;
using NUnit.Framework;
using ServiceWebsite.Domain;

namespace ServiceWebsite.UnitTests.Domain
{
    public class PastSuitabilityQuestionnaireTimeLimitTests
    {
        private readonly IPastHearing _pastHearing = new PastSuitabilityQuestionnaireTimeLimit();
        
        [Test]
        public void should_deem_hearing_past_if_scheduled_time_is_before_now()
        {
            _pastHearing.IsPast(DateTime.UtcNow.AddSeconds(-1)).Should().BeTrue();
        }

        [Test]
        public void should_deem_hearing_active_if_scheduled_later_than_now()
        {
            _pastHearing.IsPast(DateTime.UtcNow.AddSeconds(1)).Should().BeFalse();
        }
    }
}