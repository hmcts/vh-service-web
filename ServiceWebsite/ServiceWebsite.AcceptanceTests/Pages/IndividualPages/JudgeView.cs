using OpenQA.Selenium;
using ServiceWebsite.AcceptanceTests.Helpers;

namespace ServiceWebsite.AcceptanceTests.Pages.IndividualPages
{
    public class JudgeView : VideoContentPage
    {
        public JudgeView(BrowserContext browserContext) : base(browserContext, PageUri.JudgeViewPage)
        {

        }
        //Judge View page will be removed soon, this method allows navigating to Judge View page
        public override void Continue()
        {
            Validate();
            SetMethods.ClickElement(By.CssSelector("app-judge-view  button"), _browserContext);
        }
    }
}
