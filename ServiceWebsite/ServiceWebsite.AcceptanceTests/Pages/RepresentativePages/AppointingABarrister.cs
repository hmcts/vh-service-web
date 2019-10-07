using OpenQA.Selenium;
using ServiceWebsite.AcceptanceTests.Constants;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.Navigation;
using System;
using System.Collections.Generic;
using System.Text;

namespace ServiceWebsite.AcceptanceTests.Pages.RepresentativePages
{
    public class AppointingABarrister : JourneyStepPage
    {
        public AppointingABarrister(BrowserContext browserContext) : base(browserContext,  RepresentativePageUrl.AppointingABarrister, RepresentativePageNames.AppointingABarrister)
        {
        }
        
        public void Select(BarristerAppointmentTypes type)
        {
            string selectorId = string.Empty;
            switch (type)
            {
                case BarristerAppointmentTypes.IAmBarrister:
                    selectorId = "i-am-barrister";
                    break;
                case BarristerAppointmentTypes.BarristerWillBeAppointed:
                    selectorId = "barrister-will-appointed";
                    break;
                case BarristerAppointmentTypes.BarristerWillNotBeAppointed:
                    selectorId = "barrister-not-appointed";
                    break;
            }
            BrowserContext.Retry(() => SetMethods.SelectRadioButton(By.XPath($"//*[@for='{selectorId}']"), BrowserContext), 1);
        }
    }
}
