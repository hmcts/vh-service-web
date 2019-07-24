using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace ServiceWebsite.Common.Security
{
    public class CustomJwtTokenProvider : ICustomJwtTokenProvider
    {
        private readonly string _secret;
        private readonly string _audience;
        private readonly string _issuer;

        public CustomJwtTokenProvider(string secret, string audience, string issuer)
        {
            _secret = secret;
            _audience = audience;
            _issuer = issuer;
        }

        public string GenerateToken(string claims, int expiresInMinutes)
        {
            var key = Convert.FromBase64String(_secret);
            return BuildToken(claims, expiresInMinutes, key);
        }


        private string BuildToken(string claimTypeName, int expiresInMinutes, byte[] key)
        {
            var securityKey = new SymmetricSecurityKey(key);

            var descriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, claimTypeName) }),
                Audience = _audience,
                NotBefore = DateTime.UtcNow.AddMinutes(-1),
                Issuer = _issuer,
                Expires = DateTime.UtcNow.AddMinutes(expiresInMinutes + 1),
                SigningCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature)
            };

            var handler = new JwtSecurityTokenHandler();
            var token = handler.CreateJwtSecurityToken(descriptor);

            return handler.WriteToken(token);
        }
    }
}