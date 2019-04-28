using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace ServiceWebsite.Security
{
    /// <summary>
    /// Helper to abstract the user context from controllers
    /// </summary>
    public interface ICurrentUser
    {
        string Username { get; }
    }

    public class CurrentUserPrincipal : ICurrentUser
    {
        public CurrentUserPrincipal(ClaimsPrincipal userPrincipal)
        {
            Username = userPrincipal.Identity.Name;
        }

        public string Username { get; }
    }
}