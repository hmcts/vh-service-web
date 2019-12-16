using System;
using System.Threading.Tasks;

namespace ServiceWebsite.Services
{
    public interface IPollyRetryService
    {
        Task<TReturn> WaitAndRetryAsync<THandle, TReturn>(int retries, Func<int, TimeSpan> sleepDuration, 
            Action retryAction, Func<Task<TReturn>> executeFunction) where THandle: Exception;
    }
}