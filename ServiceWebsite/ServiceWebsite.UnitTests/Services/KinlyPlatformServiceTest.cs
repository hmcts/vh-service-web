using System.Threading.Tasks;
using Moq;
using NUnit.Framework;
using ServiceWebsite.Common.Security;
using ServiceWebsite.Services;

namespace ServiceWebsite.UnitTests.Services
{
    [TestFixture]
    public class KinlyPlatformServiceTest
    {
        private Mock<ICustomJwtTokenProvider> _CustomJwtTokenProvider;

        private KinlyPlatformService _kinlyPlatformService;

        public KinlyPlatformServiceTest()
        {
            _CustomJwtTokenProvider = new Mock<ICustomJwtTokenProvider>();

            _kinlyPlatformService = new KinlyPlatformService(_CustomJwtTokenProvider.Object, "url");
        }

        [Test]
        public async Task GetTestCallScoreAsync_()
        {

        }
    }
}