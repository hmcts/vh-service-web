using FluentAssertions;
using OpenQA.Selenium;
using ServiceWebsite.AcceptanceTests.Helpers;

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
        private const string ParticpantViewDetails = "When the video has ended, show the judge's view to see how you will appear to others in the hearing.";
        public void IndividualViewsInformationVideo()
        {
            _commonPages.ValidatePage(PageUrl);
            _commonPages.AccordionDetails().Should().Contain(ParticpantViewDetails);            
        }

        //Judge View page will be removed soon, this method allows navigating to Judge View page
        public void JudgeView()
        {
            _commonPages.ValidatePage("/judge-view");

        }
    }
}