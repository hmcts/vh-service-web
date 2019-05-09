using FluentAssertions;
using OpenQA.Selenium;
using ServiceWebsite.AcceptanceTests.Helpers;
using System;

namespace ServiceWebsite.AcceptanceTests.Pages.IndividualPages
{
    public class ParticipantView
    {
        private readonly BrowserContext _context;
        private readonly CommonPages _commonPages;

        public ParticipantView(BrowserContext browserContext, CommonPages commonPages)
        {
            _context = browserContext;
            _commonPages = commonPages;
        }
        private const string PageUrl = "/participant-view";
        private By _videoContent => By.Id("video-element");
        public void IndividualViewsInformationVideo()
        {
            _commonPages.ValidatePage(PageUrl);
        }

        public void VideoHasStarted()
        {
            _context.Retry(() =>
            {
                double currentTime;
                if (!double.TryParse(GetMethods.GetAttributeValue(_videoContent, _context, "currentTime"),
                        out currentTime))
                    throw new Exception();

                if (currentTime > 0)
                    return;
                throw new Exception($"Video current time is {currentTime}, it hasn't started automatically");
            });
        }

        //Judge View page will be removed soon, this method allows navigating to Judge View page
        public void JudgeView()
        {
            _commonPages.ValidatePage("/judge-view");
        }
    }
}