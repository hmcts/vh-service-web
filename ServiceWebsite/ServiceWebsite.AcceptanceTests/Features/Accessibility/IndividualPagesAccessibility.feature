Feature: Individual Pages Accessibility
    In order to ensure service web is accessible to all users
    As a service
    I want to check each page for potential accessibility issues
	
@accessibility
Scenario: About you page accessibility
    Given Individual participant is on 'about you' page
    Then the page should be accessible 

@accessibility
Scenario: Interpreter page accessibility
    Given Individual participant is on 'interpreter' page
    Then the page should be accessible 

@accessibility
Scenario: Your computer page accessibility
    Given Individual participant is on 'your computer' page
    Then the page should be accessible 

@accessibility
Scenario: About your computer page accessibility
    Given Individual participant is on 'about your computer' page
    When provides answer as No
    Then the page should be accessible 

@accessibility
Scenario: Your internet connection page accessibility
    Given Individual participant is on 'your internet connection' page
    When provides answer as No
    Then the page should be accessible 

@accessibility
Scenario: Access to a room page accessibility
    Given Individual participant is on 'access to a room' page
    When provides answer as No
    Then the page should be accessible 

@accessibility
Scenario: Consent page accessibility
    Given Individual participant is on 'consent' page
    When provides answer as No
    Then the page should be accessible 

@accessibility
# this scenario is bad BDD practice and should be refactored - this is a copy and paste from IndividualThankYou.feature
Scenario: Thank you page accessibility
    Given Individual participant is on 'consent' page
    When provides answer as Yes
    When proceeds to next page
    Then Individual should be on 'check your computer' screen
    When provides answer as Yes
    And proceeds to next page
    Then Individual should be on 'switch on camera and microphone' screen
    When Media switched on
    And proceeds to next page
    Then Individual should be on 'test your equipment' screen
    When proceeds to next page
    And provides answer
        | page               | answer |
        | camera working     | Yes    |
        | microphone working | Yes    |
        | video working      | Yes    |
    Then Individual should be on 'thank you' screen
    And the page should be accessible
    
