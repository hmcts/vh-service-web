using OpenQA.Selenium;
using Polly;
using Protractor;
using System;
using System.Collections.Concurrent;

namespace ServiceWebsite.AcceptanceTests.Helpers
{
    public class BrowserContext
    {
        public string BaseUrl { private get; set; }

        public NgWebDriver NgDriver;
        internal ContextItems Items { get; set; }

        public void BrowserSetup(string baseUrl, SeleniumEnvironment environment)
        {
            if (string.IsNullOrEmpty(baseUrl))
                throw new ArgumentNullException(nameof(baseUrl));

            var driver = environment.GetDriver();
            NgDriver = new NgWebDriver(driver);
            TryMaximize();
            NgDriver.IgnoreSynchronization = true;
            BaseUrl = baseUrl;
        }

        public void TryMaximize()
        {
            try
            {
                NgDriver.Manage().Window.Maximize();
            }
            catch (NotImplementedException e)
            {
                Console.WriteLine("Skipping maximize, not supported on current platform: " + e.Message);
            }
        }

        public void BrowserTearDown()
        {
            NgDriver.Quit();
            NgDriver.Dispose();
        }

        public void LaunchSite()
        {
            if (string.IsNullOrEmpty(BaseUrl))
            {
                throw new InvalidOperationException("BaseUrl has not been set through BrowserSetup() yet");
            }

            Console.WriteLine($"Navigating to {BaseUrl}");
            NgDriver.WrappedDriver.Navigate().GoToUrl(BaseUrl);
        }

        internal void Retry(Action action, int times = 5)
        {
            Policy
                .Handle<Exception>()
                .WaitAndRetry(times, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)))
                .Execute(action);
        }

        public void WaitForAngular() => ((NgWebDriver)NgDriver).WaitForAngular();

        public string ExecuteJavascript(string script)
        {
            return (String)((IJavaScriptExecutor)NgDriver).ExecuteScript($"{script};");
        }
        public void AcceptAlert()
        {
            Retry(() => NgDriver.SwitchTo().Alert().Accept(), 3);
        }
        public void GoToPage(string page) => NgDriver.WrappedDriver.Navigate().GoToUrl($"{BaseUrl}{page}");
    }

    internal class ContextItems
    {
        private ConcurrentDictionary<string, dynamic> _items;

        public ContextItems()
        {
            _items = new ConcurrentDictionary<string, dynamic>();
        }

        public void AddOrUpdate<T>(string key, T value)
        {
            try
            {
                _items.AddOrUpdate(key, value, (k, v) => value);
            }
            catch (Exception ex)
            {
                throw new ApplicationException($"Failed to add item with key {key} to context", ex);
            }
        }

        public dynamic Get(string key)
        {
            dynamic value;
            if (_items.TryGetValue(key, out value))
            {
                return value;
            }
            return null;
        }
    }
}