using System.ComponentModel.DataAnnotations;

namespace ServiceWebsite.Domain
{
    public enum Role
    {
        [Display(Name = "VH Officer")] VhOfficer = 1,
        [Display(Name = "Representative")] Representative = 2,
        [Display(Name = "Individual")] Individual = 3,
        [Display(Name = "Judge")] Judge = 4,
        [Display(Name = "Case Admin")] CaseAdmin = 5
    }
}