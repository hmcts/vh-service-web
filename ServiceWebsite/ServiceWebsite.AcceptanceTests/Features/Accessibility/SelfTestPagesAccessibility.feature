Feature: Self Test Pages Accessibility
    In order to ensure service web is accessible to all users
    As a service
    I want to check each page for potential accessibility issues
	
@accessibility
Scenario: Check your computer page accessibility
    Given Individual participant is on 'check your computer' page
    Then the page should be accessible 

@accessibility
Scenario: Switch on camera and microphone page accessibility
    Given Individual participant is on 'switch on camera and microphone' page having submitted questionnaire
    Then the page should be accessible 

@accessibility
Scenario: Test your equipment page accessibility
    Given Individual participant is on 'test your equipment' page
    Then the page should be accessible 

@accessibility
Scenario: Camera working page accessibility
    Given Individual participant is on 'camera working' page
    Then the page should be accessible 

@accessibility
Scenario: Microphone working page accessibility
    Given Individual participant is on 'microphone working' page
    Then the page should be accessible 

@accessibility
Scenario: Video working page accessibility
    Given Individual participant is on 'video working' page
    Then the page should be accessible 

@accessibility
Scenario: Sign in on computer page accessibility
    Given Individual participant is on 'sign in on computer' page
    Then the page should be accessible 
    
@accessibility
Scenario: Sign Back In page accessibility
    Given Individual participant is on 'check your computer' page
    When provides answer as No
    And proceeds to next page
    Then Individual should be on 'sign back in' screen
    And the page should be accessible
