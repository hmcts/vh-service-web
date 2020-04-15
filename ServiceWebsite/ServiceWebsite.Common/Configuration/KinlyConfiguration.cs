namespace ServiceWebsite.Common.Configuration
{
    public class KinlyConfiguration
    {
        public string ApiSecret { get; set; }
        public string SelfTestApiSecret { get; set; }
        public string Audience { get; set; }
        public string Issuer { get; set; }
    }
}