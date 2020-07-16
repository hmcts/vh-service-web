namespace ServiceWebsite.Common.Security
{
    public interface ICustomJwtTokenProvider
    {
        string GenerateSelfTestApiToken(string claims, int expiresInMinutes);
    }
}