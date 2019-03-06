namespace ServiceWebsite.Domain
{
    public class ChecklistAnswer
    {
        public ChecklistAnswer(string question, string answer, string notes) {
            Question = question;
            Answer = answer;
            Notes = notes;
        }

        public string Question { get; }
        public string Answer { get; }
        public string Notes { get; }
    }
}