using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceWebsite.BookingsAPI.Client;
using ServiceWebsite.Models;
using ServiceWebsite.UserAPI.Client;
using ServiceWebsite.VideoAPI.Client;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Net;
using System.Reflection;
using System.Threading.Tasks;

namespace ServiceWebsite.Controllers
{
    [Produces("application/json")]
    [Route("HealthCheck")]
    [AllowAnonymous]
    [ApiController]
    public class HealthCheckController : Controller
    {
        private readonly IUserApiClient _userApiClient;
        private readonly IBookingsApiClient _bookingsApiClient;
        private readonly IVideoApiClient _videoApiClient;

        public HealthCheckController(IUserApiClient userApiClient, IBookingsApiClient bookingsApiClient, IVideoApiClient videoApiClient)
        {
            _userApiClient = userApiClient;
            _bookingsApiClient = bookingsApiClient;
            _videoApiClient = videoApiClient;
        }

        /// <summary>
        /// Check Service Health
        /// </summary>
        /// <returns>Error if fails, otherwise OK status</returns>
        [HttpGet("health")]
        [SwaggerOperation(OperationId = "CheckServiceHealth")]
        [ProducesResponseType(typeof(Models.HealthCheckResponse), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(Models.HealthCheckResponse), (int)HttpStatusCode.InternalServerError)]
        public async Task<IActionResult> Health()
        {
            var response = new Models.HealthCheckResponse
            {
                BookingsApiHealth = { Successful = true },
                UserApiHealth = { Successful = true },
                VideoApiHealth = { Successful = true },
                AppVersion = GetApplicationVersion()
            };
            try
            {
                await _userApiClient.GetJudgesAsync();
            }
            catch (Exception ex)
            {
                if (!(ex is UserApiException))
                {
                    response.UserApiHealth.Successful = false;
                    response.UserApiHealth.ErrorMessage = ex.Message;
                    response.UserApiHealth.Data = ex.Data;
                }
            }

            try
            {
                await _bookingsApiClient.GetCaseTypesAsync();
            }
            catch (Exception ex)
            {
                if (!(ex is BookingsApiException))
                {
                    response.BookingsApiHealth.Successful = false;
                    response.BookingsApiHealth.ErrorMessage = ex.Message;
                    response.BookingsApiHealth.Data = ex.Data;
                }
            }

            try
            {
                await _videoApiClient.GetConferencesTodayAsync();
            }
            catch (Exception ex)
            {
                response.VideoApiHealth = HandleVideoApiCallException(ex);
            }

            if (!response.UserApiHealth.Successful || !response.BookingsApiHealth.Successful || !response.VideoApiHealth.Successful)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, response);
            }

            return Ok(response);
        }

        private Models.HealthCheck HandleVideoApiCallException(Exception ex)
        {
            var isApiException = ex is VideoApiServiceException;
            var healthCheck = new Models.HealthCheck { Successful = true };
            if (isApiException && (((VideoApiServiceException)ex).StatusCode != (int)HttpStatusCode.InternalServerError))
            {
                return healthCheck;
            }

            healthCheck.Successful = false;
            healthCheck.ErrorMessage = ex.Message;
            healthCheck.Data = ex.Data;

            return healthCheck;
        }

        private Models.ApplicationVersion GetApplicationVersion()
        {
            var applicationVersion = new Models.ApplicationVersion()
            {
                FileVersion = GetExecutingAssemblyAttribute<AssemblyFileVersionAttribute>(a => a.Version),
                InformationVersion = GetExecutingAssemblyAttribute<AssemblyInformationalVersionAttribute>(a => a.InformationalVersion)
            };
            return applicationVersion;
        }

        private string GetExecutingAssemblyAttribute<T>(Func<T, string> value) where T : Attribute
        {
            T attribute = (T)Attribute.GetCustomAttribute(Assembly.GetExecutingAssembly(), typeof(T));
            return value.Invoke(attribute);
        }
    }
}