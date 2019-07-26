using FluentAssertions;
using OpenQA.Selenium;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Models;
using ServiceWebsite.AcceptanceTests.Navigation;
using ServiceWebsite.AcceptanceTests.Pages.SelfTesPages;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Steps
{
    [Binding]
    public sealed class SelfTestSteps
    {
        private readonly BrowserContext _context;
        private readonly SwitchOnCameraMicrophone _switchOnCameraAndMicrophonePage;

        public SelfTestSteps(BrowserContext context )
        {
            _context = context;
            _switchOnCameraAndMicrophonePage = new SwitchOnCameraMicrophone(_context);
        }

        [When(@"Media switched on")]
        public void WhenCameraAndMicrophoneAreSwitchedOn()
        {
            _switchOnCameraAndMicrophonePage.ParticipantSwitchesOnCameraAndMicrophone();
        }

        [When(@"Media not switched on")]
        public void WhenCameraAndMicrophoneAreNotSwitchedOn()
        {
            _switchOnCameraAndMicrophonePage.ParticipantSwitchesOnCameraAndMicrophone();
        }

    }
}