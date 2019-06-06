using FluentAssertions;
using OpenQA.Selenium;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Navigation;

namespace ServiceWebsite.AcceptanceTests.Pages.IndividualPages
{
    public class UseCameraMicrophone : JourneyStepPage
    {
        public UseCameraMicrophone(BrowserContext browserContext) : base(browserContext, PageUri.UseCameraMicrophonePage)
        {

        }
        
        private By UseMyCameraAndMicrophone => By.CssSelector("app-show-details span");
        private const string UseMyCameraAndMicrophoneSummaryText = "Why do I need to use my camera?";
        private By SwitchOnMedia => By.Id("switch-on-media");
        private string UseMyCameraAndMicrophoneAccordion()
        {
            SetMethods.ClickElement(UseMyCameraAndMicrophone, BrowserContext);
            return GetMethods.GetText(UseMyCameraAndMicrophone, BrowserContext);
        }

        public void IndividualSwitchesOnCameraAndMicrophone()
        {
            BrowserContext.Retry(() =>
            {
                BrowserContext.NgDriver.Url.Should().Contain(PageUri.UseCameraMicrophonePage);
            });
            UseMyCameraAndMicrophoneAccordion().Should().Be(UseMyCameraAndMicrophoneSummaryText);
            SetMethods.ClickElement(SwitchOnMedia, BrowserContext);
        }
    }
}