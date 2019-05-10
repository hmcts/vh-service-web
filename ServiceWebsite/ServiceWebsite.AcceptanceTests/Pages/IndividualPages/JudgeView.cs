using OpenQA.Selenium;
using ServiceWebsite.AcceptanceTests.Helpers;
using System;
using System.Collections.Generic;
using System.Text;

namespace ServiceWebsite.AcceptanceTests.Pages.IndividualPages
{
    public class JudgeView : VideoContentPage
    {
        public JudgeView(BrowserContext browserContext) : base(browserContext)
        {

        }
        //Judge View page will be removed soon, this method allows navigating to Judge View page
        protected override string UrlToValidate => PageUri.JudgeViewPage;

        public override void Continue()
        {
            Validate();
            SetMethods.ClickElement(By.CssSelector("app-judge-view  button"), _browserContext);
        }
    }
}
