namespace ServiceWebsite.Models {

    public class SubmitChecklistRequest {
        public ChecklistAnswerRequest[] Answers {get;set;}
        
        public long HearingId {get;set;}
    }
}