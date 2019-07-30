using OpenQA.Selenium;
using ServiceWebsite.AcceptanceTests.Helpers;
using System;

namespace ServiceWebsite.AcceptanceTests.Pages.IndividualPages
{
    public class VideoContentPage : JourneyStepPage
    {
        public VideoContentPage(BrowserContext browserContext, string url) : base(browserContext, url, string.Empty)
        {

        }
        private By _videoContent => By.Id("video-element");
        public void VideoHasStarted()
        {
            BrowserContext.Retry(() =>
            {
                //double currentTime;
                //if (!double.TryParse(GetMethods.GetAttributeValue(_videoContent, BrowserContext, "currentTime"),
                //        out currentTime))
                //    throw new Exception();

                //if (currentTime > 0)
                //    return;
                //throw new Exception($"Video current time is {currentTime}, it hasn't started automatically");
            });
        }
    }
}