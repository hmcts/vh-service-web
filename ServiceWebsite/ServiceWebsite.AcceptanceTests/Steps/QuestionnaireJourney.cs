using ServiceWebsite.AcceptanceTests.Navigation;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Pages;
using TechTalk.SpecFlow;
using ServiceWebsite.BookingsAPI.Client;
using System.Collections.Generic;
using OpenQA.Selenium;
using ServiceWebsite.AcceptanceTests.Constants;
using ServiceWebsite.AcceptanceTests.Pages.SelfTesPages;
using System.Linq;
using ServiceWebsite.AcceptanceTests.NuGet.Contexts;
using ServiceWebsite.AcceptanceTests.Pages.RepresentativePages;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public class QuestionnaireJourney
    {
        private readonly InformationSteps _information;
        private readonly DecisionJourney _checkYourComputer;
        private ErrorMessage _errorMessage;
        public readonly ScenarioContext _scenarioContext;
        private readonly TestContextBase _testContext;
        private readonly BrowserContext _browserContext;
        private List<Page> _pages = new List<Page>();
        public QuestionnaireJourney(TestContextBase testContext, BrowserContext browserContext, InformationSteps information, ScenarioContext scenarioContext)
        {
            _information = information;
            _errorMessage = new ErrorMessage(browserContext);
            _checkYourComputer = new DecisionJourney(browserContext, PageUri.CheckYourComputer, SelfTestPageNames.CheckYourComputer);
            _scenarioContext = scenarioContext;
            _testContext = testContext;
            _browserContext = browserContext;

            InitialisePage(browserContext);
            SelfTestPages(browserContext);
        }
        
        protected virtual void InitialisePage(BrowserContext browserContext)
        {
            //Ideally this should be abstract
        }
        private void SelfTestPages(BrowserContext browserContext)
        {
            _pages.Add(new DecisionJourney(browserContext, PageUri.CheckYourComputer, SelfTestPageNames.CheckYourComputer));
            _pages.Add(new SwitchOnCameraMicrophone(browserContext));
            _pages.Add(new JourneyStepPage(browserContext, PageUri.TestYourEquipment, SelfTestPageNames.TestYourEquipment));
            _pages.Add(new DecisionJourney(browserContext, PageUri.CameraWorking, SelfTestPageNames.CameraWorking));
            _pages.Add(new DecisionJourney(browserContext, PageUri.MicrophoneWorking, SelfTestPageNames.MicrophoneWorking));
            _pages.Add(new DecisionJourney(browserContext, PageUri.VideoWorking, SelfTestPageNames.VideoWorking));
            _pages.Add(new DecisionJourney(browserContext, PageUri.SignInOncomputer, SelfTestPageNames.SignInOncomputer));
            _pages.Add(new DecisionJourney(browserContext, PageUri.SignBackIn, SelfTestPageNames.SignBackIn));

        }

        [Then(@"(.*) error should be displayed")]
        [Then(@"(.*) errors should be displayed")]
        private void ThenAnErrorMessageShouldBeDisplayed(int errorCounter)
        {
            _errorMessage.ValidateErrorMessage(errorCounter);
        }

        [When(@"provides answer as (.*)")]
        private void WhenIndividualProvidesAnswerAsNotsure(AnswerType answer)
        {
            SelectAnswer((DecisionJourney)CurrentPage, answer);
        }

        [When(@"When provides selects option as (.*)")]
        private void WhenRepresentativeProvidesAnswerAsNotsure(AnswerType answer)
        {
            SelectAnswer((DecisionJourney)CurrentPage, answer);
        }

        [When(@"attempts to proceed without selecting an answer")]
        [When(@"attempts to proceed without providing additional information")]
        [When(@"proceeds to next page")]
        private void WhenIndividualAttemptsToProceedWithoutProvidingAdditionalInformation()
        {
            CurrentPage.Continue();
        }

        [When(@"provides additional information '(.*)'")]
        [When(@"provides additional information containing a two character length '(.*)'")]
        private void WhenIndividualProvidesAdditionalInformationContainingLessThanThreeCharacters(string detail)
        {
            ((DecisionJourney)CurrentPage).SelectYes(detail);
        }

        [When(@"provides additional information containing a two character length '(.*)' for No answer")]
        private void WhenIndividualProvidesAdditionalInformationContainingLessThanThreeCharactersForNoAnswer(string detail)
        {
            ((DecisionJourney)CurrentPage).SelectNo(detail);
        }

        [When(@"clicks Check My Equipment button")]
        private void WhenClicksCheckMyEquipmentButton()
        {
            _browserContext.NgDriver.WaitUntilElementVisible(By.Id("checkYourEquipment")).Click();
        }

        protected void InitiateJourneySteps(string pageName)
        {
            foreach (var page in _pages)
            {
                if (page.Name == SelfTestPageNames.SwitchOnCameraAndMicrophone)
                {
                    var switchOnCameraAndMicrophone = (SwitchOnCameraMicrophone)page;
                    switchOnCameraAndMicrophone.ParticipantSwitchesOnCameraAndMicrophone();
                    switchOnCameraAndMicrophone.Continue();
                    continue;
                }
                if (page.Name == RepresentativePageNames.AppointingABarrister && page.Name != pageName)
                {
                    var appointingABarrister = (AppointingABarrister)page;
                    appointingABarrister.Select(BarristerAppointmentTypes.IAmBarrister);
                    appointingABarrister.Continue();
                    continue;
                }
                if (page.Name == pageName)
                {
                    _scenarioContext.Set(page, "CurrentPage");
                    break;
                }
                NavigateToDecisionPage(page);
            }
        }

        protected void NavigateToDecisionPage(Page page)
        {
            page.Validate();
            if(page is DecisionJourney)
            {
                DecisionJourney decisionJourneyPage = (DecisionJourney)page;
                if (ShouldSelectYes(decisionJourneyPage))
                {
                    decisionJourneyPage.SelectYes();
                }
                else
                {
                    decisionJourneyPage.SelectNo();
                }
            }
            if (page is JourneyStepPage)
            {
                ((JourneyStepPage)page).Continue();
            }
                
        }

        protected virtual bool ShouldSelectYes(DecisionJourney decisionJourneyPage)
        {
            return true;
        }

        protected JourneyStepPage CurrentPage
        {
            get
            {
                return _scenarioContext.Get<JourneyStepPage>("CurrentPage");
            }
        }

        protected List<Page> PageList
        {
            get
            {
                return _pages;
            }
        }

        protected Page GetPage(string pageName)
        {
            switch (pageName)
            {
                case RepresentativePageNames.PleaseContactUs:
                    return new Page(_browserContext, RepresentativePageUrl.PleaseContactUs, RepresentativePageNames.PleaseContactUs);
                case RepresentativePageNames.ThankYou:
                    return new Page(_browserContext, PageUri.ThankYouPage, IndividualPageNames.ThankYou);
                case SelfTestPageNames.EquipmentBlocked:
                    return new Page(_browserContext, PageUri.EquipmentBlocked, "equipment blocked");
                default:
                    return _pages.Single(p => p.Name == pageName);
            }
        }

        protected void SelectAnswer(DecisionJourney page, AnswerType answer)
        {
            switch (answer)
            {
                case AnswerType.Yes:
                    page.SelectYes();
                    break;
                case AnswerType.No:
                    page.SelectNo();
                    break;
                case AnswerType.NotSure:
                    page.SelectNotSure();
                    break;
            }
        }

        protected SuitabilityAnswersRequest CreateSuitabilityAnswersRequest(string key, string answer, string extendedAnswer)
        {
            return new SuitabilityAnswersRequest
            {
                Key = key,
                Answer = answer,
                Extended_answer = extendedAnswer
            };
        }

        protected void SubmitSuitabilityAnswers(string participantId, List<SuitabilityAnswersRequest> answerRequestBody)
        {
            var requestUrl = $"/hearings/{_testContext.HearingId}/participants/{participantId}/suitability-answers";
            var answerRequest = _testContext.Put(requestUrl, answerRequestBody);
            _testContext.BookingsApiClient().Execute(answerRequest);
        }
    }
}