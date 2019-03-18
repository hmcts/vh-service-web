using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using Moq;
using NUnit.Framework;
using ServiceWebsite.Services;

namespace ServiceWebsite.UnitTests
{
    public class HearingServiceTests
    {
        private HearingsService _hearingService;

        [SetUp]
        public void Setup()
        {
           _hearingService = new HearingsService();
        }

        [Test]
        public async Task Should_select_only_hearings_containing_participant()
        {
            const int idForHearingWithParticipant = 2;
            const int idForHearingMissingParticipant = 4;

            const string expectedUserId = "expected.user@hmcts.net";

            WhenGettingHearingsToday().ResponseContains(x =>
            {
                x.AHearing.With.Id(idForHearingWithParticipant).With.AParticipant(expectedUserId);
                x.AHearing.With.Id(idForHearingMissingParticipant).With.AParticipant("another.user@hmcts.net");
            }).Mock();

            var hearings = await _hearingService.GetHearingsFor(expectedUserId);
            hearings.Single().Id.Should().Be(idForHearingWithParticipant);
        }

        private HearingsApiResponseBuilder WhenGettingHearingsToday() {
            return HearingsApiResponseBuilder.ForHearingsToday();
        }
    }
}