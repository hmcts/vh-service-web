using FluentAssertions;
using OpenQA.Selenium;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Navigation;

namespace ServiceWebsite.AcceptanceTests.Pages.SelfTesPages
{
    public class SwitchOnCameraMicrophone : JourneyStepPage
    {
        private readonly string _pageUrl;
        public SwitchOnCameraMicrophone(BrowserContext browserContext, string pageUrl) : base(browserContext, PageUri.SwitchOnCameraAndMicrophone)
        {
            _pageUrl = pageUrl;
        }
        
        private By UseMyCameraAndMicrophone => By.CssSelector("app-show-details span");
        private const string UseMyCameraAndMicrophoneSummaryText = "Why do I need to use my camera and microphone?";
        private By SwitchOnMedia => By.Id("switch-on-media");
        private string UseMyCameraAndMicrophoneAccordion()
        {
            SetMethods.ClickElement(UseMyCameraAndMicrophone, BrowserContext);
            return GetMethods.GetText(UseMyCameraAndMicrophone, BrowserContext);
        }

        public void ParticipantSwitchesOnCameraAndMicrophone()
        {
            BrowserContext.Retry(() =>
            {
                BrowserContext.NgDriver.Url.Should().Contain(PageUri.SwitchOnCameraAndMicrophone);
            });
            UseMyCameraAndMicrophoneAccordion().Should().Be(UseMyCameraAndMicrophoneSummaryText);
            SetMethods.ClickElement(SwitchOnMedia, BrowserContext);
        }
    }
}