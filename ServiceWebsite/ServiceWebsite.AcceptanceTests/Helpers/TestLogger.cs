using System;
using System.Reflection;
using ServiceWebsite.Common;

namespace ServiceWebsite.AcceptanceTests.Helpers
{
    public class TestLogger
    {
        public static void Log(string  eventTitle, string message)
        {
            var category = Assembly.GetCallingAssembly().GetName().ToString();
            Console.WriteLine("Logging {0}: {1}: {2} ", category, eventTitle, message);
            ApplicationLogger.Trace(category, eventTitle, message);
        }
    }
}
