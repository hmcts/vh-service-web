using System.Reflection;
using FluentAssertions;
using ServiceWebsite.AcceptanceTests.Configuration;
using ServiceWebsite.AcceptanceTests.Helpers;

namespace ServiceWebsite.AcceptanceTests.Validations
{
    public class DataSetUpValidation
    {
        public void AllVideoHearingBookingsShouldHaveBeenSuccessfullyCreated(BookingsApiClientHelper helper, UserAccount userAccount)
        {
            bool created = helper.CreateNewVideoHearingForCaseParticipants(userAccount);
            created.Should().BeTrue("new Video Hearings for case participants in config should have been created");
        }

        public void AllVideoHearingBookingsShouldHaveBeenSuccessfullyDeleted(BookingsApiClientHelper helper, UserAccount userAccount)
        {
            if (userAccount != null)
            {
                bool deleted = helper.DeleteVideoHearingBookingsForAllCaseParticipants(userAccount);
                deleted.Should().BeTrue("all video hearings for participants in the config should have been deleted");
            }
            else
            {
                TestLogger.Log(MethodBase.GetCurrentMethod().Name, "There are no video hearing bookings to be deleted");
            }
        }
    }
}
