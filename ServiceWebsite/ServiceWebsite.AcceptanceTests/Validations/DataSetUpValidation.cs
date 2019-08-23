using System;
using System.Reflection;
using FluentAssertions;
using Microsoft.Extensions.Configuration;
using ServiceWebsite.AcceptanceTests.Configuration;
using ServiceWebsite.AcceptanceTests.Helpers;
using ServiceWebsite.AcceptanceTests.TestClients;

namespace ServiceWebsite.AcceptanceTests.Validations
{
    public class DataSetUpValidation
    {
        public void AllVideoHearingBookingsShouldHaveBeenSuccessfullyCreated(BookingsApiClientHelper helper, UserAccount userAccount, IConfigurationRoot configRoot, BookingsApiTestClient client)
        {
            bool created = helper.CreateNewVideoHearingForCaseParticipants(userAccount, configRoot, client);
            created.Should().BeTrue("new Video Hearings for case participants in config should have been created");
        }

        public void AllVideoHearingBookingsShouldHaveBeenSuccessfullyDeleted(BookingsApiClientHelper helper, UserAccount userAccount, BookingsApiTestClient client)
        {
            if (userAccount != null)
            {
                bool deleted = helper.DeleteVideoHearingBookingsForAllCaseParticipants(userAccount, client);
                deleted.Should().BeTrue("all video hearings for participants in the config should have been deleted");
            }
            else
            {
                TestLogger.Log(MethodBase.GetCurrentMethod().Name, "There are no video hearing bookings to be deleted");
            }
        }
    }
}
