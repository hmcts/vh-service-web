// ------------------------------------------------------------------------------
//  <auto-generated>
//      This code was generated by SpecFlow (http://www.specflow.org/).
//      SpecFlow Version:3.0.0.0
//      SpecFlow Generator Version:3.0.0.0
// 
//      Changes to this file may cause incorrect behavior and will be lost if
//      the code is regenerated.
//  </auto-generated>
// ------------------------------------------------------------------------------
#region Designer generated code
#pragma warning disable
namespace ServiceWebsite.AcceptanceTests.Features
{
    using TechTalk.SpecFlow;
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("TechTalk.SpecFlow", "3.0.0.0")]
    [System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    [NUnit.Framework.TestFixtureAttribute()]
    [NUnit.Framework.DescriptionAttribute("Individual answers \'A quiet room\' question")]
    public partial class IndividualAnswersAQuietRoomQuestionFeature
    {
        
        private TechTalk.SpecFlow.ITestRunner testRunner;
        
#line 1 "AccessToRoom.feature"
#line hidden
        
        [NUnit.Framework.OneTimeSetUpAttribute()]
        public virtual void FeatureSetup()
        {
            testRunner = TechTalk.SpecFlow.TestRunnerManager.GetTestRunner();
            TechTalk.SpecFlow.FeatureInfo featureInfo = new TechTalk.SpecFlow.FeatureInfo(new System.Globalization.CultureInfo("en-US"), "Individual answers \'A quiet room\' question", "\tAs an Individual Participant\t\r\n\tI want to let the court know whether I have acce" +
                    "ss to a suitable room or not\r\n\tSo that the court can decide whether a video hear" +
                    "ing is not suitable for me", ProgrammingLanguage.CSharp, ((string[])(null)));
            testRunner.OnFeatureStart(featureInfo);
        }
        
        [NUnit.Framework.OneTimeTearDownAttribute()]
        public virtual void FeatureTearDown()
        {
            testRunner.OnFeatureEnd();
            testRunner = null;
        }
        
        [NUnit.Framework.SetUpAttribute()]
        public virtual void TestInitialize()
        {
        }
        
        [NUnit.Framework.TearDownAttribute()]
        public virtual void ScenarioTearDown()
        {
            testRunner.OnScenarioEnd();
        }
        
        public virtual void ScenarioInitialize(TechTalk.SpecFlow.ScenarioInfo scenarioInfo)
        {
            testRunner.OnScenarioInitialize(scenarioInfo);
            testRunner.ScenarioContext.ScenarioContainer.RegisterInstanceAs<NUnit.Framework.TestContext>(NUnit.Framework.TestContext.CurrentContext);
        }
        
        public virtual void ScenarioStart()
        {
            testRunner.OnScenarioStart();
        }
        
        public virtual void ScenarioCleanup()
        {
            testRunner.CollectScenarioErrors();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Individual participant does not have access to a room at the time of hearing")]
        [NUnit.Framework.CategoryAttribute("VIH-4337")]
        public virtual void IndividualParticipantDoesNotHaveAccessToARoomAtTheTimeOfHearing()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Individual participant does not have access to a room at the time of hearing", null, new string[] {
                        "VIH-4337"});
#line 7
this.ScenarioInitialize(scenarioInfo);
            this.ScenarioStart();
#line 8
 testRunner.Given("Individual participant is on \'access to a room\' page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 9
 testRunner.When("Individual provides answer as No", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 10
 testRunner.And("Individual proceeds to next page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 11
 testRunner.Then("Individual should be on \'consent\' screen", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Individual participant has access to a room at the time of hearing")]
        [NUnit.Framework.CategoryAttribute("VIH-4337")]
        public virtual void IndividualParticipantHasAccessToARoomAtTheTimeOfHearing()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Individual participant has access to a room at the time of hearing", null, new string[] {
                        "VIH-4337"});
#line 14
this.ScenarioInitialize(scenarioInfo);
            this.ScenarioStart();
#line 15
 testRunner.Given("Individual participant is on \'access to a room\' page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 16
 testRunner.When("Individual provides answer as Yes", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 17
 testRunner.And("Individual proceeds to next page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 18
 testRunner.Then("Individual should be on \'consent\' screen", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Access To A Room Page - Individual participant attempts to proceed to next page w" +
            "ithout providing answer")]
        [NUnit.Framework.CategoryAttribute("VIH-4337")]
        public virtual void AccessToARoomPage_IndividualParticipantAttemptsToProceedToNextPageWithoutProvidingAnswer()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Access To A Room Page - Individual participant attempts to proceed to next page w" +
                    "ithout providing answer", null, new string[] {
                        "VIH-4337"});
#line 21
this.ScenarioInitialize(scenarioInfo);
            this.ScenarioStart();
#line 22
 testRunner.Given("Individual participant is on \'access to a room\' page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 23
 testRunner.When("Individual attempts to proceed without selecting an answer", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 24
 testRunner.Then("1 error should be displayed", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Access To A Room Page - Representative participant attempts to proceed to next pa" +
            "ge without providing answer")]
        [NUnit.Framework.CategoryAttribute("VIH-4432")]
        [NUnit.Framework.CategoryAttribute("smoketest")]
        public virtual void AccessToARoomPage_RepresentativeParticipantAttemptsToProceedToNextPageWithoutProvidingAnswer()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Access To A Room Page - Representative participant attempts to proceed to next pa" +
                    "ge without providing answer", null, new string[] {
                        "VIH-4432",
                        "smoketest"});
#line 27
this.ScenarioInitialize(scenarioInfo);
            this.ScenarioStart();
#line 28
 testRunner.Given("Representative participant is on \'access to a room rep\' page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 29
 testRunner.When("provides answer as Yes", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 30
 testRunner.And("proceeds to next page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 31
 testRunner.Then("Representative should be on \'consent\' screen", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
    }
}
#pragma warning restore
#endregion
