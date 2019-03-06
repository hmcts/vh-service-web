using System.Collections.Generic;

namespace ServiceWebsite.Domain {
    
    public class Checklist {

        public Checklist(string userEmail, long hearingId) {
            Answers = new List<ChecklistAnswer>();
            UserEmail = userEmail;
            HearingId = hearingId;
        }
        
        public string UserEmail { get; }
        
        public long HearingId { get; }

        public List<ChecklistAnswer> Answers {get;set;}
    }

}