namespace ServiceWebsite.AcceptanceTests.Data.TestData
{
    public class DefaultData
    {
        public AboutYou AboutYou { get; set; }
        public string AboutYourComputer { get; set; }
        public string AccessToRoom { get; set; }
        public string CameraWorking { get; set; }
        public string CheckYourComputer { get; set; }
        public string Consent { get; set; }
        public string InternetConnection { get; set; }
        public string Interpreter { get; set; }
        public string MicrophoneWorking { get; set; }
        public OtherInformation OtherInformation { get; set; }
        public PresentingTheCase PresentingTheCase { get; set; }
        public string VideoWorking { get; set; }
        public string YourComputer { get; set; }
    }

    public class AboutYou
    {
        public string Answer { get; set; }
        public string ExtendedAnswer { get; set; }
    }

    public class OtherInformation
    {
        public string Answer { get; set; }
        public string ExtendedAnswer { get; set; }
    }

    public class PresentingTheCase
    {
        public string Answer { get; set; }
        public string WhoWillBePresentingName { get; set; }
        public string WhoWillBePresentingEmail { get; set; }
    }
}
