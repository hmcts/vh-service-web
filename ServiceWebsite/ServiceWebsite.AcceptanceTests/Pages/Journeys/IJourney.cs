using System.Collections.Generic;

namespace ServiceWebsite.AcceptanceTests.Pages.Journeys
{
    public interface IJourney
    {
        List<Page> Journey();
        void VerifyDestinationIsInThatJourney(Page destinationPage);
        void VerifyUserIsApplicableToJourney(string currentUserRole);
        Page GetNextPage(Page currentPage);
    }
}
