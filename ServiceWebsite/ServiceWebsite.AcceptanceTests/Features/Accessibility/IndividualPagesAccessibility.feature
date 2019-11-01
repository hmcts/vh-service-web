Feature: Individual Pages Accessibility
    In order to ensure service web is accessible to all users
    As a service
    I want to check each page for potential accessibility issues
	
@Accessibility
Scenario: About you page accessibility
    Given Individual participant is on 'about you' page
    Then the page should be accessible 

@Accessibility
Scenario: Interpreter page accessibility
    Given Individual participant is on 'interpreter' page
    Then the page should be accessible 

@Accessibility
Scenario: Your computer page accessibility
    Given Individual participant is on 'your computer' page
    Then the page should be accessible 

@Accessibility
@broken
# -> error: Expected BrowserContext.NgDriver.Url "https://localhost:5600/thank-you" to contain "/sign-in-on-computer".
Scenario: Thank you page accessibility
    Given Individual participant is on 'thank you' page
    Then the page should be accessible 

@Accessibility
Scenario: About your computer page accessibility
    Given Individual participant is on 'about your computer' page
    When provides answer as No
    Then the page should be accessible 

@Accessibility
Scenario: Your internet connection page accessibility
    Given Individual participant is on 'your internet connection' page
    When provides answer as No
    Then the page should be accessible 

@Accessibility
Scenario: Access to a room page accessibility
    Given Individual participant is on 'access to a room' page
    When provides answer as No
    Then the page should be accessible 

    @Accessibility
Scenario: Consent page accessibility
    Given Individual participant is on 'consent' page
    When provides answer as No
    Then the page should be accessible 
    
