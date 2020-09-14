using AcceptanceTests.Common.Api.Hearings;
using AcceptanceTests.Common.Configuration;
using ServiceWebsite.AcceptanceTests.Helpers;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Hooks
{
    [Binding]
    public class RegisterApisHooks
    {
        [BeforeScenario(Order = (int)HooksSequence.RegisterApisHooks)]
        public void RegisterApis(TestContext context)
        {
            context.Api = new TestApiManager(context.WebConfig.VhServices.TestApiUrl, context.TestApiBearerToken);
            ConfigurationManager.VerifyConfigValuesSet(context.Api);
        }
    }
}
