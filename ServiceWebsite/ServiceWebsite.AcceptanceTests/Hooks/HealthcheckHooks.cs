using AcceptanceTests.Common.Api.Healthchecks;
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
            CheckBookingsApiHealth(context.ServiceWebConfig.VhServices.BookingsApiUrl, context.Tokens.BookingsApiBearerToken);
            CheckUserApiHealth(context.ServiceWebConfig.VhServices.UserApiUrl, context.Tokens.UserApiBearerToken);
            CheckVideoApiHealth(context.ServiceWebConfig.VhServices.VideoApiUrl, context.Tokens.VideoApiBearerToken);
        }

        private static void CheckBookingsApiHealth(string apiUrl, string bearerToken)
        {
            new HealthcheckManager(apiUrl, bearerToken).CheckHealthOfBookingsApi();
        }
        private static void CheckUserApiHealth(string apiUrl, string bearerToken)
        {
            new HealthcheckManager(apiUrl, bearerToken).CheckHealthOfUserApi();
        }
        private static void CheckVideoApiHealth(string apiUrl, string bearerToken)
        {
            new HealthcheckManager(apiUrl, bearerToken).CheckHealthOfVideoApi();
        }
    }
}
