using System;
using System.Reflection;
using ServiceWebsite.Common;

namespace ServiceWebsite.AcceptanceTests.Helpers
{
    public class TestLogger
    {
        public static void Log(string message)
        {
            ApplicationLogger.Trace(Assembly.GetCallingAssembly().GetName().Name,
                                    Assembly.GetCallingAssembly().GetName().FullName,
                                    message);
        }
    }
}
