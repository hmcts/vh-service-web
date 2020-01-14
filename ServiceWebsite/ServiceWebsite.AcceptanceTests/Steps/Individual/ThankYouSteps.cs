using System.Collections.Generic;
using AcceptanceTests.Common.Api.Hearings;
using AcceptanceTests.Common.Driver.Browser;
using AcceptanceTests.Common.Test.Steps;
using ServiceWebsite.AcceptanceTests.Helpers;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps.Individual
{
    [Binding]
    public class ThankYouSteps : ISteps
    {
        private readonly Dictionary<string, UserBrowser> _browsers;
        private readonly TestContext _c;

        public ThankYouSteps(Dictionary<string, UserBrowser> browsers, TestContext testContext)
        {
            _browsers = browsers;
            _c = testContext;
        }

        public void ProgressToNextPage(){}

        [Then(@"answers have been stored")]
        public void ThenAnswersHaveBeenStored()
        {
            var bookingsApiManager = new BookingsApiManager(_c.ServiceWebConfig.VhServices.BookingsApiUrl, _c.Tokens.BookingsApiBearerToken);
            var answers = bookingsApiManager.GetSuitabilityAnswers(_c.CurrentUser.Username);
        }
    }
}
