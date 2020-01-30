using System.Globalization;

namespace ServiceWebsite.AcceptanceTests.Data
{
    public static class DateFormats
    {
        public static string CommonDateFormat = "dddd dd MMMM yyyy";
        public static string CommonTimeFormat = "hh:mmtt";
        public static string HearingDetailsDateInUkFormat = new CultureInfo("en-GB").DateTimeFormat.LongDatePattern;
        public static string HearingDetailsTime = CultureInfo.CurrentCulture.DateTimeFormat.ShortTimePattern;
    }
}
