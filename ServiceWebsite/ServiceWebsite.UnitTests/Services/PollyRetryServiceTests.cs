using System;
using System.Threading.Tasks;
using FluentAssertions;
using NUnit.Framework;
using ServiceWebsite.Services;

namespace ServiceWebsite.UnitTests.Services
{
    [TestFixture]
    public class PollyRetryServiceTests
    {
        private readonly IPollyRetryService _pollyRetryService;

        public PollyRetryServiceTests()
        {
            _pollyRetryService = new PollyRetryService();    
        }
        
        [Test]
        public void WaitAndRetryAsync_Retries_On_Exception()
        {
            var retryInvoked = false;

            _pollyRetryService.WaitAndRetryAsync<Exception, object>
            (
                3, i => TimeSpan.FromSeconds(1), () => retryInvoked = true,
                () =>  throw new Exception("What")
            );
            
            Assert.True(retryInvoked);
        }   
        
        [Test]
        public async Task WaitAndRetryAsync_Does_Not_Retry()
        {
            var retryInvoked = false;

            var result = await _pollyRetryService.WaitAndRetryAsync<Exception, object>
            (
                3, i => TimeSpan.FromSeconds(1), () => retryInvoked = true,
                () => Task.FromResult<object>("returned")
            );
            
            Assert.False(retryInvoked);
            result.Should().Be("returned");
        }   
    }
}