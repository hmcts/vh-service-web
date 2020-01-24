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

        public static readonly Page Login = new Page("Login", "login.microsoftonline.com");
        public static readonly Page AboutHearings = new Page("About Hearings", "about-hearings");
        public static readonly Page CourtBuildingVideo = new Page("Court Building Video", "court-building-video");
        public static readonly Page DifferentHearingTypes = new Page("Different Hearing Types", "different-hearing-types");
        public static readonly Page ExploreCourtBuilding = new Page("Explore Court Building", "explore-court-building");
        public static readonly Page HelpTheCourtDecide = new Page("Help the Court Decide", "help-the-court-decide");
        public static readonly Page MediaError = new Page("Media Error", "media-error");
        public static readonly Page ParticipantView = new Page("Participant View", "participant-view");
        public static readonly Page UseCameraMicrophone = new Page("Use Camera and Microphone", "use-camera-microphone");
        public static readonly Page AboutYou = new Page("About You", "about-you");
        public static readonly Page ExploreVideoHearing = new Page("Explore Video Hearing", "explore-video-hearing");
        public static readonly Page Interpreter = new Page("Interpreter", "interpreter");
        public static readonly Page YourComputer = new Page("Your Computer", "your-computer");
        public static readonly Page AboutYourComputer = new Page("About Your Computer", "about-your-computer");
        public static readonly Page ThankYou = new Page("Thank You", "thank-you");
        public static readonly Page YourInternetConnection = new Page("Your Internet Connection", "your-internet-connection");
        public static readonly Page AccessToARoom = new Page("Access to a Room", "access-to-a-room");
        public static readonly Page Consent = new Page("Consent", "consent");
        public static readonly Page YourVideoHearing = new Page("Your Video Hearing", "your-video-hearing");
        public static readonly Page PresentingTheCase = new Page("Presenting the Case", "presenting-the-case");
        public static readonly Page OtherInformation = new Page("Other Information", "other-information");
        public static readonly Page AnswersSaved = new Page("Answers Saved", "answers-saved");
        public static readonly Page AnswersSavedIndividual = new Page("Answers Saved Individual", "answers-saved-citizen");
        public static readonly Page ThankYouRep = new Page("Thank You Rep", "thank-you-rep");

        // After submission of answers
        public static readonly Page CheckYourComputer = new Page("Check Your Computer", "check-your-computer");
        public static readonly Page SwitchOnCameraAndMicrophone = new Page("Switch On Camera and Microphone", "switch-on-camera-and-microphone");
        public static readonly Page TestYourEquipment = new Page("Test Your Equipment", "test-your-equipment");
        public static readonly Page CameraWorking = new Page("Camera Working", "camera-working");
        public static readonly Page MicrophoneWorking = new Page("Microphone Working", "microphone-working");
        public static readonly Page VideoWorking = new Page("Video Working", "video-working");
        public static readonly Page SignInOnComputer = new Page("Sign In On Computer", "sign-in-on-computer");
        public static readonly Page SignBackIn = new Page("Sign Back In", "sign-back-in");
        public static readonly Page EquipmentBlocked = new Page("Equipment Blocked", "equipment-blocked");

        // Common
        public static readonly Page NotFound = new Page("Not Found", "not-found");
        public static readonly Page Unauthorised = new Page("Unauthorised", "unauthorised");
        public static readonly Page ContactUs = new Page("Contact Us", "contact-us");
        public static readonly Page Accessibility = new Page("Accessibility", "accessibility");
        public static readonly Page PrivacyPolicy = new Page("Privacy Policy", "privacy-policy");
        public static readonly Page OpenGovernmentLicence = new Page("Open Government Licence", "open-government-licence");
        public static readonly Page UnsupportedBrowser = new Page("Unsupported Browser", "unsupported-browser");
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
                yield return AboutHearings;
                yield return CourtBuildingVideo;
                yield return DifferentHearingTypes;
                yield return ExploreCourtBuilding;
                yield return HelpTheCourtDecide;
                yield return MediaError;
                yield return ParticipantView;
                yield return UseCameraMicrophone;
                yield return AboutYou;
                yield return ExploreVideoHearing;
                yield return Interpreter;
                yield return YourComputer;
                yield return AboutYourComputer;
                yield return ThankYou;
                yield return YourVideoHearing;
                yield return PresentingTheCase;
                yield return OtherInformation;
                yield return AnswersSaved;
                yield return ThankYouRep;
                yield return YourInternetConnection;
                yield return AccessToARoom;
                yield return Consent;
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
                yield return AnswersSavedIndividual;
            }
        }
    }
}