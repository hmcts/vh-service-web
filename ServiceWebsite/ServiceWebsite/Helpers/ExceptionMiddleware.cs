using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using ServiceWebsite.Common;

namespace ServiceWebsite.Helpers
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (NotFoundException ex)
            {
                var properties = new Dictionary<string, string>
                {
                    {"resource", ex.ResourceId}
                };
                ApplicationLogger.TraceException(TraceCategories.MissingResource, "ResourceNotFound", ex, httpContext.User, properties);
                await HandleNotFoundException(httpContext, ex);
            }
            catch (Exception ex)
            {
                ApplicationLogger.TraceException(TraceCategories.Unhandled, "API Exception", ex, httpContext.User);
                await HandleExceptionAsync(httpContext, ex);
            }
        }

        private static Task HandleNotFoundException(HttpContext context, NotFoundException exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.NotFound;
            return context.Response.WriteAsync(exception.Message);
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;
            return context.Response.WriteAsync(exception.Message);
        }
    }
}