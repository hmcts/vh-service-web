using System;
using System.Collections;
using System.Collections.Generic;
using System.Reflection;
using ServiceWebsite.Common;

namespace ServiceWebsite.AcceptanceTests.Helpers
{
    public class TestLogger
    {
        const string CATEGORY = "Acceptance Test";
        public static void Log(string message)
        {
            ApplicationLogger.Trace(CATEGORY,
                                    Assembly.GetCallingAssembly().GetName().FullName,
                                    message);
        }

        public static void LogTestResult(string user, IDictionary testResult)
        {
            ApplicationLogger.TraceWithProperties(CATEGORY, Assembly.GetCallingAssembly().GetName().FullName,
                                                    user, (IDictionary<string, string>)testResult);
        }
    }
}
