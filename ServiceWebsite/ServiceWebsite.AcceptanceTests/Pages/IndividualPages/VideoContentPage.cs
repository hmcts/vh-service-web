using OpenQA.Selenium;
using ServiceWebsite.AcceptanceTests.Helpers;
using System;
using System.Collections.Generic;
using System.Text;

namespace ServiceWebsite.AcceptanceTests.Pages.IndividualPages
{
    public class VideoContentPage : JourneyStepPage
    {
        public VideoContentPage(BrowserContext browserContext) : base(browserContext)
        {

        }
        private By _videoContent => By.Id("video-element");
        public void VideoHasStarted()
        {
            _browserContext.Retry(() =>
            {
                double currentTime;
                if (!double.TryParse(GetMethods.GetAttributeValue(_videoContent, _browserContext, "currentTime"),
                        out currentTime))
                    throw new Exception();

                if (currentTime > 0)
                    return;
                throw new Exception($"Video current time is {currentTime}, it hasn't started automatically");
            });
        }
    }
}
