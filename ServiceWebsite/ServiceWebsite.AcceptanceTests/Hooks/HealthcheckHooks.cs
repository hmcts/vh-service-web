using System.Net;
using FluentAssertions;
using ServiceWebsite.AcceptanceTests.Helpers;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Hooks
{
    [Binding]
    public class HealthcheckHooks
    {
        [BeforeScenario(Order = (int)HooksSequence.HealthcheckHooks)]
        public void CheckApiHealth(TestContext context)
        {
            var response = context.Api.HealthCheck();
            response.StatusCode.Should().Be(HttpStatusCode.OK,
                $"Healthcheck failed with '{response.StatusCode}' and error message '{response.ErrorMessage}'");
        }
    }
}
