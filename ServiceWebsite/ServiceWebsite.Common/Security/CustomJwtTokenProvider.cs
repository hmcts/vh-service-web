using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using ServiceWebsite.Common.Configuration;

namespace ServiceWebsite.Common.Security
{
    public class CustomJwtTokenProvider : ICustomJwtTokenProvider
    {
        private readonly KinlyConfiguration _kinlyConfiguration;

        public CustomJwtTokenProvider(KinlyConfiguration kinlyConfiguration)
        {
            _kinlyConfiguration = kinlyConfiguration;
        }

        public string GenerateSelfTestApiToken(string claims, int expiresInMinutes)
        {
            var key = Convert.FromBase64String(_kinlyConfiguration.SelfTestApiSecret);
            return BuildToken(claims, expiresInMinutes, key);
        }


        private string BuildToken(string claimTypeName, int expiresInMinutes, byte[] key)
        {
            var securityKey = new SymmetricSecurityKey(key);

            var descriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, claimTypeName) }),
                Audience = _kinlyConfiguration.Audience,
                NotBefore = DateTime.UtcNow.AddMinutes(-1),
                Issuer = _kinlyConfiguration.Issuer,
                Expires = DateTime.UtcNow.AddMinutes(expiresInMinutes + 1),
                SigningCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature)
            };

            var handler = new JwtSecurityTokenHandler();
            var token = handler.CreateJwtSecurityToken(descriptor);

            return handler.WriteToken(token);
        }
    }
}