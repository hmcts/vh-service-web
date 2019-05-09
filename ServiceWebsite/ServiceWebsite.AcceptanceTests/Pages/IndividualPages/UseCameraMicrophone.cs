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
        private const string PageUrl = "/use-camera-microphone";
        private const string UseMyCameraAndMicrophoneHeading = "Use your camera and microphone";
        private const string UseMyCameraAndMicrophoneMessage = "Switch on your camera and microphone to see the short interactive video.";
        private const string UseMyCameraAndMicrophoneSummaryText = "Why do I need to use my camera and microphone?";
        private const string UseMyCameraAndMicrophoneDetailsText = "If you switch on your camera and microphone, you’ll be able to see what it’s like to be in a video hearing. Once the video has finished, your camera and microphone will switch off again.";
        private By SwitchOnMedia => By.Id("switch-on-media");
        private const string CameraAndMicrophoneAreSwitchedOnHeading = "Your camera and microphone are now switched on";
        private const string CameraAndMicrophoneAreSwitchedOnMessage = "You're now ready to watch the interactive video.";

        private string UseMyCameraAndMicrophoneSummaryLink()
        {
            SetMethods.ClickElement(UseMyCameraAndMicrophone, _context);
            return GetMethods.GetText(UseMyCameraAndMicrophone, _context);
        }

        public void IndividualSwitchesOnCameraAndMicrophone()
        {
            _commonPages.ValidatePage(PageUrl);
            _commonPages.PageHeading().Should().Be(UseMyCameraAndMicrophoneHeading);
            _commonPages.BodyOfThePage().Should().Be(UseMyCameraAndMicrophoneMessage);
            UseMyCameraAndMicrophoneSummaryLink().Should().Be(UseMyCameraAndMicrophoneSummaryText);
            _commonPages.PageDetails().Should().Be(UseMyCameraAndMicrophoneDetailsText);
            SetMethods.ClickElement(SwitchOnMedia, _context);
        }

        public void CameraAndMicrophoneAreSwitchedOn()
        {
            _commonPages.ValidatePage(PageUrl);
            _commonPages.PageHeading().Should().Be(CameraAndMicrophoneAreSwitchedOnHeading);
            _commonPages.BodyOfThePage().Should().Be(CameraAndMicrophoneAreSwitchedOnMessage);
            _commonPages.Continue();
        }
    }
}