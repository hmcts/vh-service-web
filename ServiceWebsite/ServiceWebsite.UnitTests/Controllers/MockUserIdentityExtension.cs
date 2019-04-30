using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace ServiceWebsite.UnitTests.Controllers
{
    public static class MockUserIdentityExtension
    {
        /// <summary>
        /// Helper to mock the current user name
        /// </summary>
        public static void MockUserIdentity(this Controller controller, string username)
        {
            var httpContext = new DefaultHttpContext {User = new TestPrincipal(username)};
            controller.ControllerContext = new ControllerContext {HttpContext = httpContext};
        }
    }
}