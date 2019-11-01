Feature: Self Test Pages Accessibility
    In order to ensure service web is accessible to all users
    As a service
    I want to check each page for potential accessibility issues
	
@Accessibility
Scenario: Check your computer page accessibility
    Given Individual participant is on 'check your computer' page
    Then the page should be accessible 

@Accessibility
Scenario: Switch on camera and microphone page accessibility
    Given Individual participant is on 'switch on camera and microphone' page
    Then the page should be accessible 

@Accessibility
Scenario: Test your equipment page accessibility
    Given Individual participant is on 'test your equipment' page
    Then the page should be accessible 

@Accessibility
Scenario: Camera working page accessibility
    Given Individual participant is on 'camera working' page
    Then the page should be accessible 

@Accessibility
Scenario: Microphone working page accessibility
    Given Individual participant is on 'microphone working' page
    Then the page should be accessible 

@Accessibility
Scenario: Video working page accessibility
    Given Individual participant is on 'video working' page
    Then the page should be accessible 

@Accessibility
@broken
# Expected BrowserContext.NgDriver.Url "https://localhost:5600/thank-you" to contain "/sign-in-on-computer"
Scenario: Sign in on computer page accessibility
    Given Individual participant is on 'sign in on computer' page
    Then the page should be accessible 

@Accessibility
@broken
# Expected BrowserContext.NgDriver.Url "https://localhost:5600/thank-you" to contain "/sign-in-on-computer"
Scenario: Sign back in connection page accessibility
    Given Individual participant is on 'sign back in' page
    Then the page should be accessible 

@Accessibility
@broken
# Expected BrowserContext.NgDriver.Url "https://localhost:5600/thank-you" to contain "/sign-in-on-computer"
Scenario: Equipment blocked connection page accessibility
    Given Individual participant is on 'equipment blocked' page
    Then the page should be accessible 
