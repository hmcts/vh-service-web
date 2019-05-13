using FluentAssertions;
using OpenQA.Selenium;
using ServiceWebsite.AcceptanceTests.Helpers;

namespace ServiceWebsite.AcceptanceTests.Pages.IndividualPages
{
    public class UseCameraMicrophone
    {
        private readonly BrowserContext _context;
        private readonly CommonPages _commonPages;

        public UseCameraMicrophone(BrowserContext browserContext, CommonPages commonPages)
        {
            _context = browserContext;
            _commonPages = commonPages;
        }

        private By UseMyCameraAndMicrophone => By.CssSelector("app-show-details span");
        private const string UseMyCameraAndMicrophoneSummaryText = "Why do I need to use my camera and microphone?";
        private By SwitchOnMedia => By.Id("switch-on-media");

        private string UseMyCameraAndMicrophoneAccordion()
        {
            SetMethods.ClickElement(UseMyCameraAndMicrophone, _context);
            return GetMethods.GetText(UseMyCameraAndMicrophone, _context);
        }

        public void IndividualSwitchesOnCameraAndMicrophone()
        {
            _commonPages.ValidatePage(PageUri.UseCameraMicrophonePage);
            UseMyCameraAndMicrophoneAccordion().Should().Be(UseMyCameraAndMicrophoneSummaryText);
            SetMethods.ClickElement(SwitchOnMedia, _context);
        }

        public void CameraAndMicrophoneAreSwitchedOn()
        {
            _commonPages.ValidatePage(PageUri.UseCameraMicrophonePage);
            _commonPages.Continue();
        }
    }
}