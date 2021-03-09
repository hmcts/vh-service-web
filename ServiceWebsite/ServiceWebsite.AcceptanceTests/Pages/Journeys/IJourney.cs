using System.Collections.Generic;
using TestApi.Contract.Enums;

namespace ServiceWebsite.AcceptanceTests.Pages.Journeys
{
    public interface IJourney
    {
        List<Page> Journey();
        void VerifyDestinationIsInThatJourney(Page destinationPage);
        void VerifyUserIsApplicableToJourney(UserType userType);
    }
}
