using System;
using System.Collections.Generic;
using System.Text;
using OpenQA.Selenium;
using ServiceWebsite.AcceptanceTests.Helpers;

namespace ServiceWebsite.AcceptanceTests.Pages
{
    public class JourneyStepPage : Page
    {
        public JourneyStepPage(BrowserContext browserContext) : base(browserContext)
        {
           
        }

        public virtual void Continue()
        {
            Validate();
            _browserContext.NgDriver.WaitUntilElementVisible(By.Id("continue")).Click();
        }
    }
}
