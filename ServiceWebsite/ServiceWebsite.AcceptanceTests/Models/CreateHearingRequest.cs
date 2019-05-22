using FizzWare.NBuilder;
using ServiceWebsite.BookingsAPI.Client;
using System;
using System.Linq;

namespace ServiceWebsite.AcceptanceTests.Models
{
    internal static class CreateHearingRequest
    {
        public static DateTime ScheduleDateTime { get; private set; }
        public static BookNewHearingRequest BuildRequest(string individual, string representative)
        {
            var participants = Builder<ParticipantRequest>.CreateListOfSize(3).All()
                .With(x => x.Contact_email = Faker.Internet.Email())
                .With(x => x.Username = Faker.Internet.Email())
                .Build().ToList();
            participants[0].Case_role_name = "Claimant";
            participants[0].Hearing_role_name = "Claimant LIP";
            participants[0].Contact_email = individual;
            participants[0].Username = individual;
            participants[0].First_name = "Automation01";
            participants[0].Last_name = "Citizen01";

            participants[1].Case_role_name = "Claimant";
            participants[1].Hearing_role_name = "Solicitor";
            participants[1].Contact_email = representative;
            participants[1].Username = representative;
            participants[1].First_name = "Automation01";
            participants[1].Last_name = "Professional01";

            participants[2].Case_role_name = "Judge";
            participants[2].Hearing_role_name = "Judge";

            var cases = Builder<CaseRequest>.CreateListOfSize(2).Build().ToList();

            var createdBy = "caseAdmin@emailaddress.com";
            ScheduleDateTime = DateTime.Now.AddDays(1);

            return Builder<BookNewHearingRequest>.CreateNew()
                .With(x => x.Case_type_name = "Civil Money Claims")
                .With(x => x.Hearing_type_name = "Application to Set Judgment Aside")
                .With(x => x.Hearing_venue_name = "Birmingham Civil and Family Justice Centre")
                .With(x => x.Participants = participants)
                .With(x => x.Cases = cases)
                .With(x => x.Created_by = createdBy)
                .With(x => x.Scheduled_date_time = ScheduleDateTime)
                .Build();
        }
    }
}