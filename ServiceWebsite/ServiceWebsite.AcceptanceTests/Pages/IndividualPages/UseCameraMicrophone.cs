using FluentAssertions;
using OpenQA.Selenium;
using ServiceWebsite.AcceptanceTests.Helpers;

namespace ServiceWebsite.AcceptanceTests.Pages.IndividualPages
{
    public class UseCameraMicrophone : JourneyStepPage
    {
        public UseCameraMicrophone(BrowserContext browserContext) : base(browserContext)
        {

        }
        protected override string UrlToValidate => PageUri.UseCameraMicrophonePage;

        private By UseMyCameraAndMicrophone => By.CssSelector("app-show-details span");
        private const string UseMyCameraAndMicrophoneSummaryText = "Why do I need to use my camera and microphone?";
        private By SwitchOnMedia => By.Id("switch-on-media");
        private string UseMyCameraAndMicrophoneAccordion()
        {
            SetMethods.ClickElement(UseMyCameraAndMicrophone, _browserContext);
            return GetMethods.GetText(UseMyCameraAndMicrophone, _browserContext);
        }

        public void IndividualSwitchesOnCameraAndMicrophone()
        {
            _browserContext.Retry(() =>
            {
                _browserContext.NgDriver.Url.Should().Contain(PageUri.UseCameraMicrophonePage);
            });
            UseMyCameraAndMicrophoneAccordion().Should().Be(UseMyCameraAndMicrophoneSummaryText);
            SetMethods.ClickElement(SwitchOnMedia, _browserContext);
        }
    }
}