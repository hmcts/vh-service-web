Feature: Representative Pages Accessibility
    In order to ensure service web is accessible to all users
    As a service
    I want to check each page for potential accessibility issues
	
@Accessibility
Scenario: Appointing a barrister page accessibility
    Given Representative participant is on 'appointing a barrister' page
    Then the page should be accessible 

@Accessibility
Scenario: Other information page accessibility
    Given Representative participant is on 'other information' page
    Then the page should be accessible 

@Accessibility
Scenario: Answers saved page accessibility
    Given Representative participant is on 'answers saved' page
    Then the page should be accessible 


