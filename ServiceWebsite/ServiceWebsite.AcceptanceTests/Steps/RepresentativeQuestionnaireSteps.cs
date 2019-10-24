using FluentAssertions;
using OpenQA.Selenium;
using ServiceWebsite.AcceptanceTests.Constants;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Navigation;
using ServiceWebsite.AcceptanceTests.Pages;
using ServiceWebsite.BookingsAPI.Client;
using System.Collections.Generic;
using System.Linq;
using ServiceWebsite.Common;
using TechTalk.SpecFlow;
using TechTalk.SpecFlow.Assist;
using ServiceWebsite.AcceptanceTests.NuGet.Contexts;
using ServiceWebsite.AcceptanceTests.Pages.RepresentativePages;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public sealed class RepresentativeQuestionnaireSteps : QuestionnaireJourney
    {

        private readonly InformationSteps _information;
        private readonly BrowserContext _browserContext;
        private readonly TestContextBase _testContext;
        private string _representativeParticipantId;
        private readonly LoginSteps _loginSteps;
        public RepresentativeQuestionnaireSteps(LoginSteps loginSteps, TestContextBase testContext, BrowserContext browserContext, InformationSteps information, ScenarioContext scenarioContext) : base(testContext, browserContext, information, scenarioContext)
        {
            _information = information;
            _browserContext = browserContext;
            _testContext = testContext;
            _representativeParticipantId = _testContext.GetRepresentativeUser().Id.ToString();
            _loginSteps = loginSteps;
        }

        protected override void InitialisePage(BrowserContext browserContext)
        {
            PageList.Add(new AppointingABarrister(browserContext));
            PageList.Add(new DecisionJourney(browserContext, RepresentativePageUrl.OtherInformation, RepresentativePageNames.OtherInformation, RepresentativeQuestionKeys.OtherInformation));
            PageList.Add(new JourneyStepPage(browserContext, RepresentativePageUrl.AnswersSaved, RepresentativePageNames.AnswersSaved));
        }

        [Given(@"Representative participant is on '(.*)' page")]
        public void GivenRepresentativeParticipantIsOnPage(string page)
        {
            _information.InformationScreen("Representative");
            InitiateJourneySteps(page);
        }

        [When(@"provides selects option as (.*)")]
        public void WhenProvidesSelectsOption(BarristerAppointmentTypes answer)
        {
            var page = (AppointingABarrister)CurrentPage;
            switch (answer)
            {
                case BarristerAppointmentTypes.BarristerWillBeAppointed:
                    page.Select(BarristerAppointmentTypes.BarristerWillBeAppointed);
                    break;
                case BarristerAppointmentTypes.BarristerWillNotBeAppointed:
                    page.Select(BarristerAppointmentTypes.BarristerWillNotBeAppointed);
                    break;
                case BarristerAppointmentTypes.IAmBarrister:
                    page.Select(BarristerAppointmentTypes.IAmBarrister);
                    break;
            }
        }

        [Given(@"Representative participant is on '(.*)' page having submitted questionnaire")]
        public void GivenRepresentativeParticipantIsOnPageHavingSubmittedQuestionnaire(string page)
        {
            SubmitQuestionnaireForPositivePath();
            _loginSteps.WhenParticipantLogsInWithValidCredentials("Representative");
            NavigateToDecisionPage(GetPage(SelfTestPageNames.CheckYourComputer));
        }

        [Then(@"Representative should be on '(.*)' screen")]
        public void ThenParticipantShouldProceedToPage(string page)
        {
            var pageToValidate = GetPage(page);
            pageToValidate.Validate();
            if (page == RepresentativePageNames.AnswersSaved
                || page == SelfTestPageNames.CheckYourComputer
                || page == SelfTestPageNames.SwitchOnCameraAndMicrophone
                || page == SelfTestPageNames.TestYourEquipment)
            {
                _scenarioContext.Set(pageToValidate, "CurrentPage");
            }
        }

        [Given(@"Representative participant starts the questionnaire")]
        public void GivenRepresentativeParticipantStartsTheQuestionnaire()
        {
            _information.InformationScreen("Representative");
        }

        [When(@"provides answer")]
        public void WhenProvidesAnswer(Table table)
        {
            var reponses = table.CreateSet<SuitabilityResponse>();
            foreach (var response in reponses)
            {
                var currentPage = (DecisionJourney)GetPage(response.Page);
                SelectAnswer(currentPage, response.Answer);
                if (!string.IsNullOrEmpty(response.Details?.Trim()))
                {
                    currentPage.SelectYes(response.Details.Trim());
                }
                response.QuestionKey = currentPage.QuestionKey;
                currentPage.Continue();
            }
            _scenarioContext.Set(reponses, "Responses");
        }

        [Then(@"all the answers should match")]
        public void ThenAllTheAnswersShouldBeMatch()
        {
            var reponses = _scenarioContext.Get<IEnumerable<SuitabilityResponse>>("Responses");

            foreach (var expectedResponse in reponses)
            {
                var displayedAnswer = GetMethods.GetText(By.CssSelector($"#{expectedResponse.QuestionKey} strong"), _browserContext);
                if (expectedResponse.Answer == AnswerType.NotSure)
                {
                    displayedAnswer.Should().Be("I'm not sure");
                }
                else
                {
                    displayedAnswer.Should().Be(expectedResponse.Answer.ToString());
                }

                if (!string.IsNullOrEmpty(expectedResponse.Details?.Trim()))
                {
                    var displayedNotes = GetMethods.GetText(By.CssSelector($"#{expectedResponse.QuestionKey}_Notes span"), _browserContext);
                    displayedNotes.Should().Be(expectedResponse.Details.ToString());
                }
            }

            //Verify the expected data by comparing them against database
            var request = _testContext.Get($"persons/username/{_testContext.GetRepresentativeUser().Username}/suitability-answers");
            var response = _testContext.BookingsApiClient().Execute(request);
            var model = ApiRequestHelper.DeserialiseSnakeCaseJsonToResponse<List<PersonSuitabilityAnswerResponse>>(response.Content);
            var answers = model.First(h => h.Hearing_id == _testContext.HearingId).Answers;
            foreach (var expectedResponse in reponses)
            {
                var answer = answers.Single(a => a.Key == expectedResponse.QuestionKey);
                switch (expectedResponse.Answer)
                {
                    case AnswerType.Yes:
                        answer.Answer.Should().Be("true");
                        break;
                    case AnswerType.No:
                        answer.Answer.Should().Be("false");
                        break;
                    case AnswerType.NotSure:
                        answer.Answer.Should().Be("Not sure");
                        break;
                }
                if (!string.IsNullOrEmpty(expectedResponse.Details?.Trim()))
                {
                    answer.Extended_answer.Should().Be(expectedResponse.Details.Trim().ToString());
                }
            }

        }

        [Then(@"a link with text '(.*)' to print the answers should be visible")]
        public void ThenNeedToBeAbleToPrintTheAnswer(string linkText)
        {
            var printLink = _browserContext.NgDriver.FindElement(By.Id("print_questionnaire"));
            printLink.Displayed.Should().BeTrue();
            printLink.Text.Trim().Should().Be(linkText);
        }

        [Given(@"Representative participant has already submitted questionnaire but not completed self-test")]
        public void GivenRepresentativeParticipantHasAlreadySubmittedQuestionnaireButNotCompletedSelf_Test()
        {
            SubmitQuestionnaireForPositivePath();
        }

        [Given(@"Representative participant has already submitted questionnaire but drops out")]
        public void GivenRepresentativeParticipantHasAlreadySubmittedQuestionnaireButDropsOut()
        {
            //Submit the answers for rep
            var answerRequestBody = new List<SuitabilityAnswersRequest>();
            answerRequestBody.Add(CreateSuitabilityAnswersRequest("ABOUT_YOU", "false", null));
            answerRequestBody.Add(CreateSuitabilityAnswersRequest("ABOUT_YOUR_CLIENT", "false", null));
            answerRequestBody.Add(CreateSuitabilityAnswersRequest("CLIENT_ATTENDANCE", "true", null));
            answerRequestBody.Add(CreateSuitabilityAnswersRequest("HEARING_SUITABILITY", "false", null));
            answerRequestBody.Add(CreateSuitabilityAnswersRequest("ROOM", "true", null));
            answerRequestBody.Add(CreateSuitabilityAnswersRequest("COMPUTER", "false", null));

            SubmitSuitabilityAnswers(_representativeParticipantId, answerRequestBody);
        }
        protected override bool ShouldSelectYes(DecisionJourney decisionJourneyPage)
        {
            return (decisionJourneyPage.Name == SelfTestPageNames.CheckYourComputer);
        }

        private void SubmitQuestionnaireForPositivePath()
        {
            //Submit the answers for rep
            var answerRequestBody = new List<SuitabilityAnswersRequest>();
            answerRequestBody.Add(CreateSuitabilityAnswersRequest("APPOINTING_BARRISTER", "I am the appointed barrister", null));
            answerRequestBody.Add(CreateSuitabilityAnswersRequest("OTHER_INFORMATION", "false", null));

            SubmitSuitabilityAnswers(_representativeParticipantId, answerRequestBody);
        }
    }
}