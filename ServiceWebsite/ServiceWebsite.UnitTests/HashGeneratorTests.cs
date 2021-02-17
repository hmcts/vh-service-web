using FluentAssertions;
using NUnit.Framework;
using ServiceWebsite.Common.Security;
using System;
using ServiceWebsite.Common.Configuration;

namespace ServiceWebsite.UnitTests
{
    public class HashGeneratorTests
    {
        private KinlyConfiguration _kinlyConfiguration;

        [SetUp]
        public void SetUp()
        {
            _kinlyConfiguration = new KinlyConfiguration { SelfTestApiSecret = "SECRET" };
        }

        [Test]
        public void Should_encrypt()
        {
            var hashGenerator = new HashGenerator(_kinlyConfiguration);
            var id = Guid.NewGuid().ToString();
            var computedHash = hashGenerator.GenerateSelfTestTokenHash(GetExpiryOn(), id);
            computedHash.Should().NotBeNullOrEmpty();
        }

        [Test]
        public void Should_fail_authentication()
        {
            var hashGenerator = new HashGenerator(_kinlyConfiguration);
            var id = Guid.NewGuid().ToString();
            var computedHash = hashGenerator.GenerateSelfTestTokenHash(GetExpiryOn(), id);

            var id2 = Guid.NewGuid().ToString();
            var reComputedHash = hashGenerator.GenerateSelfTestTokenHash(GetExpiryOn(), id2);
            reComputedHash.Should().NotBe(computedHash);
        }

        private static string GetExpiryOn()
        {
            return DateTime.UtcNow.AddMinutes(20).ToUniversalTime().ToString("dd.MM.yyyy-H:mmZ");
        }
    }
}