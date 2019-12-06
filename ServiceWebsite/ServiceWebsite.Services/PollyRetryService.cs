using System;
using System.Threading.Tasks;
using Polly;

namespace ServiceWebsite.Services
{
    public class PollyRetryService : IPollyRetryService
    {
        public async Task<TReturn> WaitAndRetryAsync<THandle, TReturn>(int retries, Func<int, TimeSpan> sleepDuration, 
            Action retryAction, Func<Task<TReturn>> executeFunction) where THandle: Exception
        {
            var retryPolicy = Policy
                .Handle<THandle>()
                .WaitAndRetryAsync(retries, sleepDuration, (ex, ts, index, context) =>
                {
                    retryAction?.Invoke();
                });
		
            return await retryPolicy.ExecuteAsync(executeFunction);
        }
    }
}