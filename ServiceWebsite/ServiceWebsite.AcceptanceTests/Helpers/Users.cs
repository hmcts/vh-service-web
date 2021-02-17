using System.Collections.Generic;
using System.Data;
using System.Linq;
using ServiceWebsite.Services.TestApi;

namespace ServiceWebsite.AcceptanceTests.Helpers
{
    public static class Users
    {
        public static User GetIndividualUser(List<User> users)
        {
            return users.FirstOrDefault(x => x.User_type == UserType.Individual);
        }

        public static User GetRepresentativeUser(List<User> users)
        {
            return users.FirstOrDefault(x => x.User_type == UserType.Representative);
        }

        public static User GetPanelMemberUser(List<User> users)
        {
            return users.FirstOrDefault(x => x.User_type == UserType.PanelMember);
        }

        public static User GetWingerUser(List<User> users)
        {
            return users.FirstOrDefault(x => x.User_type == UserType.Winger);
        }

        public static User GetUserFromDisplayName(List<User> users, string displayName)
        {
            return users.First(x => x.Display_name.ToLower().Contains(displayName.ToLower().Replace(" ", "")));
        }

        public static User GetUser(List<User> users, string numberString, string user)
        {
            var number = GetNumberFromWords(numberString);

            if (user.ToLowerInvariant().Contains("judge"))
            {
                return users.First(x => x.User_type == UserType.Judge);
            }

            if (user.ToLowerInvariant().Contains("individual"))
            {
                return GetAllUsersOfType(users, UserType.Individual)[number];
            }

            if (user.ToLowerInvariant().Contains("representative"))
            {
                return GetAllUsersOfType(users, UserType.Representative)[number];
            }

            if (user.ToLowerInvariant().Contains("panel member") ||
                user.ToLowerInvariant().Contains("panelmember"))
            {
                return GetAllUsersOfType(users, UserType.PanelMember)[number];
            }


            if (user.ToLowerInvariant().Contains("winger"))
            {
                return GetAllUsersOfType(users, UserType.Winger)[number];
            }

            if (user.ToLowerInvariant().Contains("observer"))
            {
                return GetAllUsersOfType(users, UserType.Observer)[number];
            }

            if (user.ToLowerInvariant().Contains("video hearings officer") ||
                user.ToLowerInvariant().Contains("videohearingsofficer"))
            {
                return users.First(x => x.User_type == UserType.VideoHearingsOfficer);
            }

            throw new DataException($"No matching user could be found from '{user}'");
        }

        private static int GetNumberFromWords(string text)
        {
            var numberTable = new Dictionary<string, int>
            {
                {"one",1},
                {"two",2},
                {"three",3},
                {"four",4},
                {"five",5}
            };
            return numberTable[text];
        }

        private static List<User> GetAllUsersOfType(List<User> users, UserType userType)
        {
            return users.FindAll(x => x.User_type == userType);
        }

        public static string GetUserName(List<User> users)
        {
            return users.Any(X => X.User_type == UserType.Representative) ? GetRepresentativeUser(users).Username : GetIndividualUser(users).Username;
        }
      

        public static string GetUserNameForJOH(List<User> users)
        {
            return users.Any(X => X.User_type == UserType.PanelMember) ? GetPanelMemberUser(users).Username : GetWingerUser(users)?.Username;
        }
    }
}
