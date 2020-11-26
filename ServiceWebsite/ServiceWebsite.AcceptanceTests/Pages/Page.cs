using System;
using System.Collections.Generic;

namespace ServiceWebsite.AcceptanceTests.Pages
{
    public class Page
    {
        public string Name { get; }
        public string Url { get; }

        private Page(string name, string url)
        {
            Name = name;
            Url = url;
        }

        // Individual
        public static readonly Page ThankYou = new Page("Thank You", "thank-you");
        
        // Representative
        public static readonly Page ThankYouRep = new Page("Thank You Rep", "thank-you-rep");

        // Shared
        public static readonly Page CheckingVideoHearing = new Page("Checking Video Hearing", "checking-video-hearing");
        public static readonly Page CheckYourComputer = new Page("Check Your Computer", "check-your-computer");
        public static readonly Page SwitchOnCameraAndMicrophone = new Page("Switch On Camera and Microphone", "switch-on-camera-and-microphone");
        public static readonly Page TestYourEquipment = new Page("Test Your Equipment", "test-your-equipment");
        public static readonly Page CameraWorking = new Page("Camera Working", "camera-working");
        public static readonly Page MicrophoneWorking = new Page("Microphone Working", "microphone-working");
        public static readonly Page VideoWorking = new Page("Video Working", "video-working");
        public static readonly Page SignInOnComputer = new Page("Sign In On Computer", "sign-in-on-computer");
        public static readonly Page SignBackIn = new Page("Sign Back In", "sign-back-in");
        public static readonly Page EquipmentBlocked = new Page("Equipment Blocked", "equipment-blocked");
        public static readonly Page Login = new Page("Login", "login.microsoftonline.com");
        public static readonly Page NotFound = new Page("Not Found", "not-found");
        public static readonly Page Unauthorised = new Page("Unauthorised", "unauthorised");
        public static readonly Page MediaError = new Page("Media Error", "media-error");
        public static readonly Page ContactUs = new Page("Contact Us", "contact-us");
        public static readonly Page Accessibility = new Page("Accessibility", "accessibility");
        public static readonly Page PrivacyPolicy = new Page("Privacy Policy", "privacy-policy");
        public static readonly Page OpenGovernmentLicence = new Page("Open Government Licence", "open-government-licence");
        public static readonly Page UnsupportedBrowser = new Page("Unsupported Browser", "unsupported-browser");
        public static readonly Page UnsupportedDevice = new Page("UnsupportedDevice", "sign-in-on-computer");
        public static readonly Page VideoWeb = new Page("Video Web", "hearing-list");

        public string ToString(Page page)
        {
            return page.Name;
        }

        public static Page FromString(string name)
        {
            foreach (var page in Values)
            {
                if (page.Name.ToLower().Equals(name.ToLower()))
                {
                    return page;
                }
            }
            throw new ArgumentOutOfRangeException($"No page found with name '{name}'");
        }

        private static IEnumerable<Page> Values
        {
            get
            {
                yield return Login;
                yield return CheckingVideoHearing;
                yield return MediaError;
                yield return ThankYou;
                yield return ThankYouRep;
                yield return CheckYourComputer;
                yield return SwitchOnCameraAndMicrophone;
                yield return TestYourEquipment;
                yield return CameraWorking;
                yield return MicrophoneWorking;
                yield return VideoWorking;
                yield return SignInOnComputer;
                yield return SignBackIn;
                yield return EquipmentBlocked;
                yield return NotFound;
                yield return Unauthorised;
                yield return ContactUs;
                yield return Accessibility;
                yield return PrivacyPolicy;
                yield return OpenGovernmentLicence;
                yield return UnsupportedBrowser;
                yield return VideoWeb;
            }
        }
    }
}