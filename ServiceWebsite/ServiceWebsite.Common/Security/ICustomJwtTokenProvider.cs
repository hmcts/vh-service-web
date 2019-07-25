namespace ServiceWebsite.Common.Security
{
    public interface ICustomJwtTokenProvider
    {
        string GenerateToken(string claims, int expiresInMinutes);
    }
}