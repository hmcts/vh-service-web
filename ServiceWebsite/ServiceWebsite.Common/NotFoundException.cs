using System;

namespace ServiceWebsite.Common
{
    /// <summary>
    /// Should be raised when a resource cannot be found
    /// </summary>
    public class NotFoundException : Exception
    {
        public string ResourceId { get; }

        public NotFoundException(string message, string resourceId) : base(message)
        {
            ResourceId = resourceId;
        }

        public NotFoundException(string resourceId) : base($"No such resource [{resourceId}]")
        {
            ResourceId = resourceId;
        }
    }
}
