namespace ServiceWebsite.Domain
{
    public class Participant
    {
        public string Email { get; }
        public Role Role { get; }

        public Participant(string email, Role role)
        {
            Email = email;
            Role = role;
        }

        public bool ChecklistRequired => Role == Role.Individual || Role == Role.Representative;
    }
}
