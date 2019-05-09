﻿using FluentAssertions;
using OpenQA.Selenium;
using ServiceWebsite.AcceptanceTests.Helpers;
using System;

namespace ServiceWebsite.AcceptanceTests.Pages.IndividualPages
{
    public class AboutHearings
    {
        private readonly BrowserContext _context;
        private readonly CommonPages _commonPages;

        public AboutHearings(BrowserContext browserContext, CommonPages commonPages)
        {
            _context = browserContext;
            _commonPages = commonPages;
        }

        public void AboutHearingsBlueScreen()
        {
            _commonPages.ValidatePage("/about-hearings");
        }
    }
}