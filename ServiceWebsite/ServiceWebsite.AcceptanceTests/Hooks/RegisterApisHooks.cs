using AcceptanceTests.Common.Api.Hearings;
using AcceptanceTests.Common.Api.Users;
using AcceptanceTests.Common.Configuration;
using ServiceWebsite.AcceptanceTests.Configuration;
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
            context.Apis = new Apis
            {
                BookingsApi = new BookingsApiManager(context.WebConfig.VhServices.BookingsApiUrl, context.Tokens.BookingsApiBearerToken),
                VideoApi = new VideoApiManager(context.WebConfig.VhServices.VideoApiUrl, context.Tokens.VideoApiBearerToken),
                UserApi = new UserApiManager(context.WebConfig.VhServices.UserApiUrl, context.Tokens.UserApiBearerToken)
            };
            ConfigurationManager.VerifyConfigValuesSet(context.Apis);
        }
    }
}
