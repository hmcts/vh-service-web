﻿using FluentAssertions;
using NUnit.Framework;
using ServiceWebsite.Security.HashGen;
using System;

namespace ServiceWebsite.UnitTests
{
    public class HashGeneratorTests
    {
        private CustomTokenSettings _customTokenSettings;

        [SetUp]
        public void SetUp()
        {
            _customTokenSettings = new CustomTokenSettings { Secret = "W2gEmBn2H7b2FCMIQl6l9rggbJU1qR7luIeAf1uuaY+ik6TP5rN0NEsPVg0TGkroiel0SoCQT7w3cbk7hFrBtA==" };
        }

        [Test]
        public void Should_encrypt()
        {
            var hashGenerator = new HashGenerator(_customTokenSettings);
            var id = Guid.NewGuid().ToString();
            var computedHash = hashGenerator.GenerateHash(GetExpiryOn(), id);
            computedHash.Should().NotBeNullOrEmpty();
        }

        [Test]
        public void Should_fail_authentication()
        {
            var hashGenerator = new HashGenerator(_customTokenSettings);
            var id = Guid.NewGuid().ToString();
            var computedHash = hashGenerator.GenerateHash(GetExpiryOn(), id);

            var id2 = Guid.NewGuid().ToString();
            var reComputedHash = hashGenerator.GenerateHash(GetExpiryOn(), id2);
            reComputedHash.Should().NotBe(computedHash);
        }

        private static string GetExpiryOn()
        {
            return DateTime.UtcNow.AddMinutes(20).ToUniversalTime().ToString("dd.MM.yyyy-H:mmZ");
        }
    }
}