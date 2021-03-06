﻿using System;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using ServiceWebsite.Common.Security;
using ServiceWebsite.Models;
using Swashbuckle.AspNetCore.Annotations;

namespace ServiceWebsite.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("participants")]
    public class TokenController : ControllerBase
    {
        private readonly IHashGenerator _hashGenerator;

        public TokenController(IHashGenerator hashGenerator)
        {
            _hashGenerator = hashGenerator;
        }

        [HttpGet("{participantId}/token")]
        [SwaggerOperation(OperationId = "GetToken")]
        [ProducesResponseType(typeof(TokenResponse), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public IActionResult GetToken(Guid participantId)
        {
            if (participantId == Guid.Empty)
            {
                ModelState.AddModelError(nameof(participantId), $"Please provide a valid {nameof(participantId)}");
                return BadRequest(ModelState);
            }

            var expiresOn = DateTime.UtcNow.AddMinutes(20).ToUniversalTime().ToString("dd.MM.yyyy-H:mmZ");
            var token = _hashGenerator.GenerateSelfTestTokenHash(expiresOn, participantId.ToString());
            var tokenResponse = new TokenResponse { ExpiresOn = expiresOn, Token = token };

            return Ok(tokenResponse);
        }
    }
}