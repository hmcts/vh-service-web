using System;
using FluentAssertions;
using NUnit.Framework;
using ServiceWebsite.Domain;

namespace ServiceWebsite.UnitTests.Domain
{
    public class HearingSuitabilityTests
    {   
        [Test]
        public void should_be_considered_past_if_scheduled_before_now()
        {
            var pastHearing = new HearingSuitability(Guid.NewGuid(), DateTime.UtcNow.AddSeconds(-1));
            pastHearing.IsPast().Should().BeTrue();
        }

        [Test]
        public void should_be_considered_future_if_scheduled_after_now()
        {
            var pastHearing = new HearingSuitability(Guid.NewGuid(), DateTime.UtcNow.AddSeconds(1));
            pastHearing.IsPast().Should().BeFalse();
        }
    }
}