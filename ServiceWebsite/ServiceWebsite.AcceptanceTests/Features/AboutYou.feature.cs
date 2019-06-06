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
    [NUnit.Framework.DescriptionAttribute("Individual Answers About You Question")]
    public partial class IndividualAnswersAboutYouQuestionFeature
    {
        
        private TechTalk.SpecFlow.ITestRunner testRunner;
        
#line 1 "AboutYou.feature"
#line hidden
        
        [NUnit.Framework.OneTimeSetUpAttribute()]
        public virtual void FeatureSetup()
        {
            testRunner = TechTalk.SpecFlow.TestRunnerManager.GetTestRunner();
            TechTalk.SpecFlow.FeatureInfo featureInfo = new TechTalk.SpecFlow.FeatureInfo(new System.Globalization.CultureInfo("en-US"), "Individual Answers About You Question", "\tAs an Individual Participant\r\n\tI want to be able to tell the court if there is a" +
                    "ny reason I don\'t think  am suitable\r\n\tSo that the court can make an informed de" +
                    "cision based on my circumstances", ProgrammingLanguage.CSharp, ((string[])(null)));
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
        [NUnit.Framework.DescriptionAttribute("Individual participant attempts to proceed to next page without providing answer " +
            "on About You page")]
        [NUnit.Framework.CategoryAttribute("smoketest")]
        [NUnit.Framework.CategoryAttribute("VIH-4332")]
        public virtual void IndividualParticipantAttemptsToProceedToNextPageWithoutProvidingAnswerOnAboutYouPage()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Individual participant attempts to proceed to next page without providing answer " +
                    "on About You page", null, new string[] {
                        "smoketest",
                        "VIH-4332"});
#line 7
this.ScenarioInitialize(scenarioInfo);
            this.ScenarioStart();
#line 8
 testRunner.Given("\'Individual\' participant is on \'about you\' page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 9
 testRunner.When("Individual attempts to proceed without selecting an answer", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 10
 testRunner.Then("1 error should be displayed", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line 11
 testRunner.When("Individual provides answer as Yes", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 12
 testRunner.And("Individual attempts to proceed without providing additional information", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 13
 testRunner.Then("1 error should be displayed", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line 14
 testRunner.When("Individual provides additional information containing a two character length \'AB\'" +
                    "", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 15
 testRunner.And("Individual proceeds to next page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 16
 testRunner.Then("1 error should be displayed", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Individual participant provides additional information for video hearing suitabil" +
            "ity")]
        [NUnit.Framework.CategoryAttribute("smoketest")]
        [NUnit.Framework.CategoryAttribute("VIH-4332")]
        public virtual void IndividualParticipantProvidesAdditionalInformationForVideoHearingSuitability()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Individual participant provides additional information for video hearing suitabil" +
                    "ity", null, new string[] {
                        "smoketest",
                        "VIH-4332"});
#line 19
this.ScenarioInitialize(scenarioInfo);
            this.ScenarioStart();
#line 20
 testRunner.Given("\'Individual\' participant is on \'about you\' page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 21
 testRunner.When("Individual provides additional information \'ABC\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 22
 testRunner.And("Individual proceeds to next page", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 23
 testRunner.Then("Individual should be on \'interpreter\' screen", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
    }
}
#pragma warning restore
#endregion
