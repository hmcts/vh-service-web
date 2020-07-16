using AcceptanceTests.Common.Test.Hooks;
using TechTalk.SpecFlow;
using TestContext = ServiceWebsite.AcceptanceTests.Helpers.TestContext;

namespace ServiceWebsite.AcceptanceTests.Hooks
{
    [Binding]
    public class ScenarioHooks
    {
        [BeforeScenario(Order = (int)HooksSequence.ScenarioHooks)]
        public void SkipScenario(TestContext context, ScenarioContext scenario)
        {
            new ShouldTestBeIgnored()
                .ForTest(scenario.ScenarioInfo)
                .WithBrowser(context.WebConfig.TestConfig.TargetBrowser)
                .WithDevice(context.WebConfig.TestConfig.TargetDevice)
                .WithOS(context.WebConfig.TestConfig.TargetOS)
                .Check();
        }
    }
}
